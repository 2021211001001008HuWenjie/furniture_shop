<template>
	<div>
		<el-page-header content="个人中心" icon="" title="家具商城管理系统" />
		
		<el-row :gutter="20" class="el-row">
			<el-col :span = "8">
				<el-card class="box-card"> 
				<el-avatar :size="100" :src="avatarUrl" />
				<h3> {{store.state.userInfo.username}}</h3>
				<h3> {{store.state.userInfo.role === 1?'管理员':'编辑'}}</h3>
				</el-card>
			</el-col>
			
			<el-col :span = "16">
				<el-card>
					<!-- 插槽 -->
					<template #header>
					      <div class="card-header">
					        <span>个人信息</span>
					      </div>
					</template>
					
					 <el-form
					    ref="userFormRef"
					    style="max-width: 600px"
					    :model="userForm"
					    :rules="userFormRules"
					    label-width="auto"
					    class="demo-ruleForm"
					    :size="formSize"
					    status-icon
					  >
					  
						<el-form-item label="用户名" prop="username">
						  <el-input v-model="userForm.username" />
						</el-form-item>
						
						<el-form-item label="性别" prop="gender">
						  <el-select
						        v-model="userForm.gender"
						        placeholder="Select"
						        style="width: 100%"
						      >
						        <el-option
						          v-for="item in options"
						          :key="item.value"
						          :label="item.label"
						          :value="item.value"
						        />
						      </el-select>
						</el-form-item>
						
						<el-form-item label="简介" prop="introduction">
							
						  <el-input v-model="userForm.introduction" type="textarea"/>
						</el-form-item>
						
						
<!-- 					:auto-upload = "false" 
						阻止头像自动上传,等待所有个人信息全部设置好之后点击上传按键,统一上传 
						:src="'http://localhost:3000' + userForm.avatar" 
						注意图片src地址要封装前缀
						这段已经封装到'@/component/upload/Upload.vue当中了'
						即，想用Upload组件，就必须传给Upload一个头像地址avatar并监听一个回调函数@mikachange
-->
						<el-form-item label="头像" prop="avatar">
						  <Upload :avatar = "userForm.avatar" @mikachange="handleChange"/>
						</el-form-item>
						
						<el-form-item>
						  <el-button type="primary" @click="submitForm()">
						    更新
						  </el-button>
						</el-form-item>
						
					</el-form>
				</el-card>
			</el-col>
		</el-row>
		
	</div>
</template>

<script setup>
import { computed,ref,reactive } from 'vue'
import { useStore } from 'vuex'

import axios from 'axios'
import { ElMessage } from 'element-plus';
import upload from '@/util/upload'
import Upload from '@/components/upload/Upload'

const store = useStore()

// 显示头像(默认?数据库用户数据)
const avatarUrl = computed(() =>
  store.state.userInfo.avatar
	? "http://localhost:3000" + store.state.userInfo.avatar
    : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
);

const handleChange = (file) => {
	userForm.avatar = URL.createObjectURL(file);
	userForm.file = file;
}


const { username,gender,introduction,avatar } = store.state.userInfo
const userFormRef = ref()
const userForm = reactive({
	username,
	gender,
	introduction,
	avatar,
	file:null
})
//性别
const options = [
	{
	label:"保密",
	value:0
	},
	{
	label:"男",
	value:1
	},
	{
	label:"女",
	value:2
	}
];

const userFormRules = reactive({
  username: [
    { required: true, message: '请输入名字', trigger: 'blur' },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'blur' },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  introduction: [
    { required: true, message: '请输入介绍', trigger: 'blur' },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  avatar: [
    { required: true, message: '请上传头像', trigger: 'blur' },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  })

//更新提交
const submitForm = () => {
	userFormRef.value.validate(async (valid) => {
		if(valid){
			// console.log("submit",userForm)
			const res = await upload("/adminapi/user/upload",userForm);	
			if(res.ActionType === "OK"){
				store.commit("changeUserInfo",res.data)
				ElMessage.success("更新成功")
			}
		}
	})
}
</script>

<style lang="scss" scoped>
.el-row{
	margin-top: 20px;
	.box-card{
		text-align: center;
	}
}
</style>