<template>
	<el-header>
<!-- 		<button @click="handleCollasped">click</button> -->
		<div class="left">
			<el-icon @click="handleCollasped"><Menu /></el-icon>
			<span style="margin-left: 10px;">家具商城管理系统</span>
		</div>
		
		<div class="right">
			<span>欢迎 {{$store.state.userInfo.username}} 回来</span>
			<el-dropdown>
			    <span class="el-dropdown-link">
			      <el-icon :size="30" color="white">
					  <User />
				  </el-icon>
			      <el-icon class="el-icon--right">
			        <arrow-down />
			      </el-icon>
			    </span>
			    <template #dropdown>
			      <el-dropdown-menu>
			        <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
			        <el-dropdown-item @click="handleLogin">退出</el-dropdown-item>

			      </el-dropdown-menu>
			    </template>
			  </el-dropdown>
		</div>
	</el-header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Menu,User} from '@element-plus/icons-vue'
const store = useStore()
const router = useRouter()

const handleCollasped = () => {
	store.commit("changeCollasped")
}

const handleCenter = () => {
	router.push("/center")
}

const handleLogin = () => {
	//退出删除本地token
	localStorage.removeItem("token")
	store.commit("clearUserInfo")
	router.push("/login")
}
</script>

<style lang="scss" scoped>
	.el-header{
		background-color: #2d3a4b;
		color: white;
		width: 100%;
		height: 10vh;
		line-height: 10vh;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.left,.right{
		display: flex;
	}
	
	.left{
		i{
			margin: auto;
			cursor: pointer;
		}
	}
	.right{
		.el-dropdown{
			margin: auto;
		}
	}
	
	:focus-visible{
		outline: none;
	}
</style>