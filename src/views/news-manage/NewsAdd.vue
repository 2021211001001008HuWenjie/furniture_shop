<template>
	<div>
		<el-page-header content="添加新闻" icon="" title="新闻/公告管理" />
		
<!-- 		newsFormRef 进行校验的ref引用对象
		newsForm 表单每个域进行绑定值的响应式对象模型
		newsFormRules 对表单制定规则 -->
		<el-form
			ref="newsFormRef"
			style="max-width: 600px"
			:model="newsForm"
			:rules="newsFormRules"
			label-width="auto"
			class="demo-ruleForm"
			:size="formSize"
			status-icon
		  >
		  
			<el-form-item label="标题" prop="title">
				<el-input v-model="newsForm.title" />
			</el-form-item>
		
			<el-form-item label="内容" prop="content">
				<editor @event="handleChange"/>
			</el-form-item>
			
			<el-form-item label="类别" prop="category">
				  <el-select
				        v-model="newsForm.category"
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
			
			<el-form-item label="封面" prop="cover">
				<Upload :avatar = "newsForm.cover" @mikachange="handleUploadChange"/>
			</el-form-item>
			
			<el-form-item>
			  <el-button type="primary" @click="submitForm()">
			    添加新闻
			  </el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup>
import { ref,reactive } from 'vue'
import { useRouter } from 'vue-router'
import upload from '@/util/upload'
import Upload from '@/components/upload/Upload'
import editor from '@/components/editor/Editor'

const router = useRouter()

const newsFormRef = ref()
const newsFormRules = reactive({
	title:[
		{ required: true, message: '请输入标题', trigger: 'blur' }
	],
	content:[
		{ required: true, message: '请输入内容', trigger: 'blur' }
	],
	category:[
		{ required: true, message: '请选择分类', trigger: 'blur' }
	],
	cover:[
		{ required: true, message: '请上传封面', trigger: 'blur' }
	],
})

//新闻类别
const options = [
	{
		label:"最新动态",
		value:1
	},
	{
		label:"通知公告",
		value:2
	},
	{
		label:"警告",
		value:3
	}
]

const newsForm = reactive({
	title:"",
	content:"",
	category:1,//1 最新动态，2 通知公告，3 警告
	cover:"",
	file:null,
	isPublish:0//0 未发布，1 已经发布
	 
})

//每次editor内容改变的回调函数
const handleChange = (data) => {
	newsForm.content = data
}
//将封面图片进行二进制转换给file
const handleUploadChange = (file) => {
	newsForm.cover = URL.createObjectURL(file);
	newsForm.file = file;
}
//提交news表单校验通过提交给后端
const submitForm = () => {
	newsFormRef.value.validate(async (valid) => {
		if(valid){
			//提交数据到后端
			console.log(newsForm)
			const res = await upload("/adminapi/news/add",newsForm);	
			router.push(`/news-manage/newslist`)

		}
	})
}
</script>

<style lang="scss" scoped>
.el-form{
	margin-top:50px;
}
</style>