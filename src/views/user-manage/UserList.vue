<template>
	<div>
		<el-card>
			<el-page-header content="用户列表" icon="" title="用户管理" />
			
				<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="username" label="用户名" width="auto" />
				
				<el-table-column label="头像" width="auto" >
					<template #default="scope"> 	
						<div v-if = "scope.row.avatar">
						  <el-avatar :size="50" :src="'http://localhost:3000' + scope.row.avatar"></el-avatar>
						</div>
						<div v-else>
							<el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
						</div>
					</template>
				</el-table-column>
				
				<el-table-column label="角色" width="auto" >
					<!-- {{scope.row.role === 1?'管理员':'店员编辑'}} -->
					<template #default="scope"> 	
						<el-tag v-if="scope.row.role === 1" type="danger">管理员</el-tag>
						<el-tag v-else type="success">店员编辑</el-tag>
					</template>
				</el-table-column>
				
				<el-table-column label="操作">
				  <template #default="scope">
					<el-button size="small" @click="handleEdit(scope.row)">
					  编辑
					</el-button>
					
					<el-popconfirm title="你确定要删除吗?"
					confirm-button-text="确定"
					cancel-button-text="取消"	@confirm="handleDelete(scope.row)">
						<template #reference>
						  <el-button
							size="small"
							type="danger"
						  >
							删除
						  </el-button>
						</template>
					  </el-popconfirm>
					  
					
				  </template>
				</el-table-column>
			</el-table>
		</el-card>
		
	  <el-dialog
		v-model="dialogVisible"
		title="编辑用户"
		width="50%"
		:before-close="handleClose"
	  >
	  
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
			
		</el-form>
		
		<template #footer>
		  <div class="dialog-footer">
			<el-button @click="dialogVisible = false">取消</el-button>
			<el-button type="primary" @click="handleEditConfirm()">
			  确认修改
			</el-button>
		  </div>
		</template>
	  </el-dialog>
		  
	</div>
</template>

<script setup>
import { ref,onMounted,reactive } from 'vue'
import axios from 'axios'

const dialogVisible =  ref(false)

const tableData = ref([])
onMounted(() => {
	getTableData()
})

const getTableData =  async () => {
	const res = await axios.get("/adminapi/user/list")
	// console.log(res)
	
	//选用reload data
	tableData.value = res.data.data
	
	
}
//编辑回调
const handleEdit = async (data) => {
	const res = await axios.get(`/adminapi/user/list/${data.id}`)
	//userForm = res.data.data
	// 不能直接赋值,需要用对象合并的方法
	Object.assign(userForm,res.data.data[0])
	console.log(res.data.data)
	
	dialogVisible.value = true
	
}
//编辑确认回调
const handleEditConfirm =  () => {
	userFormRef.value.validate(async (valid) => {
		if(valid){
			console.log(userForm)
			//1-更新后端
			await axios.put(`/adminapi/user/list/${userForm.id}`,userForm)
			//2-dialog隐藏
			dialogVisible.value = false
			//3-获取table数据，刷新数据
			getTableData()
		}
	})
}

const handleDelete = async data => {
	await axios.delete(`/adminapi/user/list/${data.id}`)
	
	getTableData()
}



const userFormRef = ref()
let userForm = reactive({
	username:"",
	password:"",
	introduction:"",
	role:2,//1是管理员，2是店员编辑,默认为2
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
  ]
  })

//权限
const options = [
  {
    label: "管理员",
    value: 1
  },
  {
    label: "店员",
    value: 2
  }
];
</script>

<style lang="scss" scoped>
.el-table{
	margin-top: 50px;
}
</style>