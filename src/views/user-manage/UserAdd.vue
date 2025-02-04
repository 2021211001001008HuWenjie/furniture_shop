<template>
	<div>
		<el-page-header content="添加用户" icon="" title="用户管理" />
		
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
			
			<el-form-item label="密码" prop="password" >
			  <el-input v-model="userForm.password" type="password"/>
			</el-form-item>
			
			<el-form-item label="身份权限" prop="role">
			  <el-select
			        v-model="userForm.role"
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
			
			<el-form-item label="个人简介" prop="introduction">
			  <el-input v-model="userForm.introduction" />
			</el-form-item>
			
			<el-form-item label="头像" prop="avatar">
			  <Upload :avatar = "userForm.avatar" @mikachange="handleChange"/>
			</el-form-item>
			
			<el-form-item>
			  <el-button type="primary" @click="submitForm()">
			    添加用户
			  </el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup>
import { ref,reactive } from 'vue'
import upload from '@/util/upload'
import Upload from '@/components/upload/Upload'
import { useRouter } from 'vue-router'

const router = useRouter()
const userFormRef = ref()
const userForm = reactive({
	username:"",
	password:"",
	gender:0,//保密
	role:2,//1是管理员，2是店员编辑,默认为2
	avatar:"",
	file:null
})

const userFormRules = reactive({
  username: [
    { required: true, message: '请输入名字', trigger: 'blur' },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  passowrd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  role: [
    { required: true, message: '请选择权限', trigger: 'blur' },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  introduction: [
    { required: true, message: '请输入介绍', trigger: 'blur' },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  avatar: [
    { required: true, message: '请上传头像', trigger: 'blur' },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ]
  })

//权限
const options = [
	{
	label:"管理员",
	value:1
	},
	{
	label:"店员",
	value:2
	}
];

const handleChange = (file) => {
	userForm.avatar = URL.createObjectURL(file);
	userForm.file = file;
}

//添加管理用户提交
const submitForm = () => {
	userFormRef.value.validate(async (valid) => {
		if(valid){
			//提交数据到后端
			console.log(userForm)
			const res = await upload("/adminapi/user/add",userForm);	
			router.push(`/user-manage/userlist`)

		}
	})
}
</script>

<style lang="scss" scoped>
	.demo-ruleForm{
		margin-top: 50px;
	}
</style>