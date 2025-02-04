<template>
	<el-container direction="vertical">
	  <TopHeader/>
	  <el-container>
		<SideMenu/>
		<el-main><router-view></router-view></el-main>
	  </el-container>
	</el-container>
</template>

<script setup>
	import TopHeader from '../components/mainbox/TopHeader.vue'
	import SideMenu from '../components/mainbox/SideMenu.vue'

</script>
<style lang="scss" scoped>
	.el-main{
		overflow: auto;

	}
</style>
