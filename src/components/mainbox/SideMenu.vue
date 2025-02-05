<template>
	<el-aside width="auto">
		<el-menu :collapse="$store.state.isCollapsed"
		:router = "true"
		:default-active="route.fullPath">
			<el-menu-item index="/index">
			  <el-icon><HomeFilled /></el-icon>
			  <span>首页</span>
			</el-menu-item>
			
			<el-menu-item index="/center">
			  <el-icon><avatar /></el-icon>
			  <span>个人中心</span>
			</el-menu-item>
			
<!-- 		v-admin封装需要admin权限才可以使用的功能权限设置，增强复用性 -->
			<el-sub-menu index="/user-manage" v-admin>
			  <template #title>
				<el-icon><UserFilled /></el-icon>
				<span>用户管理</span>
			  </template>
				<el-menu-item index="/user-manage/adduser">添加用户</el-menu-item>
				<el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
			</el-sub-menu>
			
			<el-sub-menu index="/news-manage">
			  <template #title>
				<el-icon><message-box /></el-icon>
				<span>新闻管理</span>
			  </template>
				<el-menu-item index="/news-manage/addnews">添加新闻</el-menu-item>
				<el-menu-item index="/news-manage/newslist">新闻列表</el-menu-item>
			</el-sub-menu>
			
			<el-sub-menu index="/product-manage">
			  <template #title>
				<el-icon><reading /></el-icon>
				<span>产品管理</span>
			  </template>
				<el-menu-item index="/product-manage/addproduct">添加产品</el-menu-item>
				<el-menu-item index="/product-manage/productlist">产品列表</el-menu-item>
			</el-sub-menu>
			
		</el-menu>
	</el-aside>
</template>

<script setup>
import { HomeFilled,Avatar,UserFilled,MessageBox,Reading,Pointer } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()

const store = useStore()

//用户权限控制，自定指令显示上移除功能
//但该操作并没有禁止访问路由  
const vAdmin = {
	mounted(el){
		console.log(el)
		if(store.state.userInfo.role !== 1){
			el.parentNode.removeChild(el)
		}
	}
}
</script>

<style lang="scss" scoped>
	//otto 设置好header再改
	.el-aside{
		height: 90vh;
		
		.el-menu{
			height:90vh;
			}
	}
</style>