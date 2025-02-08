<template>
	<div>
		<el-card>
			<el-page-header content="新闻列表" icon="" title="新闻/公告管理" />
			
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="title" label="标题" width="auto" />
				
				<el-table-column prop="category" label="分类" width="auto">
					<template #default="scope">
						<el-tag v-if="scope.row.category === 1" type="success">{{categoryFormat(scope.row.category)}}</el-tag>
						<el-tag v-if="scope.row.category === 2" type="warning">{{categoryFormat(scope.row.category)}}</el-tag>
						<el-tag v-if="scope.row.category === 3" type="danger">{{categoryFormat(scope.row.category)}}</el-tag>
					</template>
				</el-table-column>
				
				<el-table-column prop="editTime" label="更新时间" width="auto">
					<template #default="scope">
						{{formatTime.getTime(scope.row.editTime)}}
					</template>
				</el-table-column>
				
	<!-- 		通过:active-value="1"去自定义开关判定依据，如果绑定的值是1就打开，
					:inactive-value="0"关闭 -->
				<el-table-column prop="isPublish" label="是否发布" width="auto">
					<template #default="scope">
						<el-switch v-model="scope.row.isPublish" 
						:active-value="1"
						:inactive-value="0"
						@change="handleSwitchChange(scope.row)"/>
					</template>
				</el-table-column>
				
                 <el-table-column label="操作">
                    <template #default="scope">
                        <!-- 预览按钮 -->
                        <el-button
                            circle
                            :icon="View"
                            type="success"
                            @click="handlePreview(scope.row)"
                        ></el-button>
                        <!-- 编辑按钮 -->
                        <el-button
                            circle
                            :icon="Edit"
                            @click="handleEdit(scope.row)"
                        ></el-button>
                        <!-- 删除按钮(删除提示控件) -->
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
		
		<el-dialog
			v-model="dialogVisible"
			title="预览新闻"
			width="50%"
		>
		<div>
			<h2>{{priviewData.title}}</h2>
			<div style="font-size: 16px;color:gray;">{{formatTime.getTime(priviewData.editTime)}}</div>
			
			<el-divider>
			  <el-icon><star-filled /></el-icon>
			</el-divider>
<!-- 			v-html最好别用，以免跨栈脚本攻击 -->
			<div v-html="priviewData.content" class="htmlcontent"></div>
			
		</div>
			
			
		</el-dialog>
	</div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import formatTime from '@/util/formatTime'
import { Star,View,Edit,Delete,StarFilled } from '@element-plus/icons-vue'

const tableData = ref([])
const priviewData = ref({})
const dialogVisible = ref(false)
const router = useRouter()

onMounted(() => {
	getTableData()
})

const getTableData = async () => {
	const res = await axios.get(`/adminapi/news/list`)
	// console.log(res.data.data)
	tableData.value = res.data.data
}

//格式化分类信息
const categoryFormat = (category) => {
	const arr = ["最新动态","通知公告","警告"]
	return arr[category - 1]
}

//开关回调函数
const handleSwitchChange = async (item) => {
	await axios.put(`/adminapi/news/publish`,{id:item.id,isPublish:item.isPublish})
	
	await getTableData()
}

//预览回调函数
const handlePreview = async (data) => {
	dialogVisible.value = true
	priviewData.value = data
}

//删除回调函数 
const handleDelete = async (item) => {
	await axios.delete(`/adminapi/news/list/${item.id}`)
	getTableData()
	
}

//编辑回调函数
const handleEdit = async (item) => {
	//跳转到/news-manage/editnews/:id
	router.push(`/news-manage/editnews/${item.id}`)
	
	
}
</script>

<style lang="scss" scoped>
.el-table{
	margin-top: 50px;
}

::v-deep .htmlcontent{
	img{
		max-width: 100%;
	}
}
</style>