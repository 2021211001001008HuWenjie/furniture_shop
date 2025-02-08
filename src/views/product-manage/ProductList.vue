<template>
	<div>
		<el-card>
			<el-page-header content="产品列表" icon="" title="产品管理" />
			
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="name" label="产品名称" width="auto" />
				
				    <el-table-column label="产品图片" prop="img" width="auto">
					  
					  <template #default="scope">
					  	<div v-if = "scope.row.img" class="demo-image__preview">
							<el-image
							  ref="imageRef"
							  style="width: 100px; height: 100px"
							  :src="'http://localhost:3000' + scope.row.img"
							  :preview-src-list="srcList"
							  :initial-index="getIndex('http://localhost:3000' + scope.row.img)"
							  fit="cover"
							/>
					  	</div>
					  	<div v-else>
						  <el-image>
							<template #error>
							  <div class="image-slot">
								<el-icon><icon-picture /></el-icon>
							  </div>
							</template>
						  </el-image>
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
				
                <el-table-column label="操作" width="auto">
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
import { Star,View,Edit,Delete,StarFilled,Picture as IconPicture } from '@element-plus/icons-vue'

const tableData = ref([])
const router = useRouter()
const srcList = ref([]);


onMounted(() => {
	getTableData()
	
})


const getTableData = async () => {
	const res = await axios.get(`/adminapi/product/list`)
	// console.log(res.data.data)
	tableData.value = res.data.data
	getUrl(res.data.data)
}

// const srcList = [
// "http://localhost:3000/products_cover_uploads/866c0edd8315d6121f645fc2d4681cdd",
// "http://localhost:3000/products_cover_uploads/e9ee6cf5130d303f7cd9baddfbae711a"]


const getUrl = async (products) => {
	// 创建一个空数组来存储图片的 URL
	// const srcList = [];

	// 遍历每个产品，提取图片 URL 并添加到 srcList 中
	products.forEach(product => {
		// 假设每个产品对象中有一个 imageUrl 字段存储图片的 URL
        // 检查 imageUrl 是否存在且不为空
        if (product.img && product.img.trim() !== '') {
            srcList.value.push('http://localhost:3000' + product.img);
        }
	});

	// 现在 srcList 包含了所有产品的图片 URL
	console.log(srcList);
}

// 获取图片索引（用于预览时定位）
const getIndex = (imageUrl) => {
  return srcList.value.indexOf(imageUrl);
};

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
.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
</style>