<template>
	<div>
		<el-page-header content="添加产品" icon="" title="产品管理" />
		
		<el-form
			ref="productFormRef"
			:model="productForm"
			:rules="productFormRules"
			label-width="120px"
			class="demo-ruleForm"
		  >
		  
			<el-form-item label="产品名称" prop="name">
			  <el-input v-model="productForm.name" />
			</el-form-item>
			
			<el-form-item label="产品价格" prop="price">
			  <el-input-number v-model="productForm.price" :min="1" :max="1000000" 
			  :precision="2" abort=""/>

			  <el-form-item label="产品库存数量" prop="stock_num">
			    <el-input-number v-model="productForm.stock_num" :min="1" :max="10000"
			    abort=""/>
			  </el-form-item>
			  
			  <el-form-item label="是否发布" prop="state">
			    <template #default="scope">			
			  	<el-switch
			  		  v-model="productForm.state"
			  		  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
			  		  active-value="1"
			  		  inactive-value="0"
			  		/>
			  	</template>
			  </el-form-item>  
			</el-form-item>
			
			<el-form-item label="商品类别" prop="category_id">
			  <el-select
			        v-model="productForm.category_id"
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
			
			<el-form-item label="商品发货商" prop="store">
			  <el-select
			        v-model="productForm.store"
			        placeholder="Select"
			        style="width: 100%"
			      >
			        <el-option
			          v-for="item in storeOptions"
			          :key="item.value"
			          :label="item.label"
			          :value="item.value"
			        />
			      </el-select>
			</el-form-item>
			
<!-- 			<el-form-item label="产品标签" prop="tags">
				    <el-select
				      v-model="productForm.tags"
				      multiple
				      placeholder="Select"
				      style="width: 240px"
				    >
				      <el-option
				        v-for="item in tagOptions"
				        :key="item.value"
				        :label="item.label"
				        :value="item.value"
				      />
				    </el-select>
			</el-form-item> -->
			
			<el-form-item label="产品简要简介" prop="info">
			  <el-input v-model="productForm.info" type="textarea"/>
			</el-form-item>
			
			<el-form-item label="产品详细简介" prop="introduction">
			  <el-input v-model="productForm.introduction" type="textarea"/>
			</el-form-item>
			
			<el-form-item label="产品封面" prop="img">
			  <Upload :avatar = "productForm.img" @mikachange="handleChange"/>
			</el-form-item>
			
			
			
			<el-form-item>
			  <el-button type="primary" @click="submitForm()">
			    添加产品
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
const productFormRef = ref()
const productForm = reactive({
	name:"",
	price:0,
	info:"",
	introduction:"",
	store:"自营",
	category_id:999,
	img:"",
	file:null,
	state:0,//0是未发布,1是发布,2是下架,默认为0
	stock_num:0,
	sales_num:0,
	visit_num:0,
	tags:""
})

const productFormRules = reactive({
  name: [
    { required: true, message: '请输入名字', trigger: 'blur' },
  ],
  price: [
    { required: true, message: '请输入商品金额', trigger: 'blur' },
  ],
  category: [
    { required: true, message: '请选择商品类别', trigger: 'blur' },
  ],
  store: [
    { required: true, message: '请选择商品发货商', trigger: 'blur' },
  ],
  stock_num: [
    { required: true, message: '请输入库存数量', trigger: 'blur' },
  ],
  info: [
    { required: true, message: '请输入简要描述', trigger: 'blur' },
  ],
  introduction: [
    { required: true, message: '请输入详细描述', trigger: 'blur' },
  ],
  cover: [
    { required: true, message: '请上传产品封面', trigger: 'blur' },
  ]
  })

//商品分类
const options = [
	{
	label:"沙发",
	value:100
	},
	{
	label:"餐桌",
	value:101
	},
	{
	label:"其他",
	value:999
	},
];

const storeOptions = [
	{
	label:"自营",
	value:"自营"
	},
	{
	label:"其他",
	value:"其他"
	},
];


const handleChange = (file) => {
	productForm.img = URL.createObjectURL(file);
	productForm.file = file;
}

// const handlePriceChange = (value) => {
// 	console.log(value)
// }

const submitForm = () => {
	productFormRef.value.validate(async (valid) => {
		if(valid){
			//提交数据到后端
			console.log(productForm)
			await upload("/adminapi/product/add",productForm);	
			router.push(`/product-manage/productlist`)

		}
	})
}

const tagOptions = [
      {
        value: '1',
        label: '沙发',
      },
      {
        value: '2',
        label: '餐桌',
      },
	  {
	    value: '3',
	    label: '椅子',
	  },
	  {
	    value: '4',
	    label: '衣柜',
	  },
	  {
	    value: '5',
	    label: '床',
	  },
	  {
	    value: '6',
	    label: '灯',
	  },
    ]
</script>

<style lang="scss" scoped>
	.demo-ruleForm{
		margin-top: 50px;
	}
</style>