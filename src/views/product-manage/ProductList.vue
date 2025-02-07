<template>
	<div>
		<el-card>
			<el-page-header content="产品列表" icon="" title="产品管理" />
			
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="name" label="产品名称" width="auto" />
				
				    <el-table-column label="产品图片" prop="img">
				      <template #default="scope">
<!-- 						  :src='{{scope.row.img}}' -->
						  <div>
							  <el-image style="width: 100px; height: 100px"  :src="blobUrl"/>
						  </div>
				      </template>
				    </el-table-column>
			
				
				<el-table-column prop="info" label="简要描述" width="auto" />
<!-- 				<el-table-column prop="category_id" label="分类" width="auto">
					<template #default="scope">
						<el-tag v-if="scope.row.category === 1" type="success">{{categoryFormat(scope.row.category)}}</el-tag>
						<el-tag v-if="scope.row.category === 2" type="warning">{{categoryFormat(scope.row.category)}}</el-tag>
						<el-tag v-if="scope.row.category === 3" type="danger">{{categoryFormat(scope.row.category)}}</el-tag>
					</template>
				</el-table-column> -->
				
				<el-table-column prop="editTime" label="更新时间" width="auto">
					<template #default="scope">
						{{formatTime.getTime(scope.row.editTime)}}
					</template>
				</el-table-column>
				
				
				<el-table-column label="商品状态" width="auto" >
					<!-- {{scope.row.role === 1?'管理员':'店员编辑'}} -->
					<template #default="scope"> 	
						<el-tag v-if="scope.row.state === 0" type="danger">未上架</el-tag>
						<el-tag v-if="scope.row.state === 1" type="success">已上架</el-tag>
						<el-tag v-if="scope.row.state === 2" type="info">已售罄下架</el-tag>
					</template>
				</el-table-column>
				
                <el-table-column label="操作">
                    <template #default="scope">
                      
                        <el-button
                            circle
                            :icon="Edit"
                             @click="handleEdit(scope.row)"
                        ></el-button>

                        <el-popconfirm
                            title="你确定要删除吗?"
                            confirmButtonText="确定"
                            cancelButtonText="取消"
                            @confirm="handleDelete(scope.row)"
                        >
                            <template #reference>
                                <el-button
                                    circle
                                    :icon="Delete"
                                    type="danger"
                                ></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
			</el-table>
		</el-card>
		
	</div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import formatTime from '@/util/formatTime'
import { Star,View,Edit,Delete,StarFilled } from '@element-plus/icons-vue'

const tableData = ref([])
const router = useRouter()

onMounted(() => {
	getTableData()
	
})


const getTableData = async () => {
	const res = await axios.get(`/adminapi/product/list`)
	// console.log(res.data.data)
	tableData.value = res.data.data
	console.log(tableData)
}

const fetchImage = async () => {
  try {
    const response = await fetch('/api/get-image'); // 替换为你的 API 地址
    const blob = await response.blob();
    imageUrl.value = URL.createObjectURL(blob); // 将 Blob 转换为 URL
  } catch (error) {
    console.error('获取图片失败:', error);
  }
};


//开关回调函数
// const handleSwitchChange = async (item) => {
// 	await axios.put(`/adminapi/news/publish`,{id:item.id,isPublish:item.isPublish})
	
// 	await getTableData()
// }

//预览回调函数
// const handlePriview = async (data) => {
// 	dialogVisible.value = true
// 	priviewData.value = data
// }

//删除回调函数 
const handleDelete = async (item) => {
	await axios.delete(`/adminapi/product/list/${item.id}`)
	getTableData()
	
}


//编辑回调函数
const handleEdit = async (item) => {
	//跳转到/news-manage/editnews/:id
	router.push(`/product-manage/editproduct/${item.id}`)
}

</script>

<style lang="scss" scoped>
.el-table{
	margin-top: 50px;
}

.table-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

::v-deep .htmlcontent{
	img{
		max-width: 100%;
	}
}
</style>