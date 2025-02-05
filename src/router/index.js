import {createRouter,createWebHistory} from 'vue-router'
import Login from "../views/Login.vue";
import MainBox from "../views/MainBox.vue"
import RoutesConfig from "./config"
import store from '../store/index'


const routes = [
	{
		path:'/shopping',
		name:'Shopping',
		component:()=>import('../views/Shopping.vue')
	},
	{
		path:'/login',
		name:'Login',
		component:()=>import('../views/Login.vue')
	},
	{
		path:'/mainBox',
		name:'MainBox',
		component:MainBox
		//MainBox嵌套路由，后面根据权限动态添加
	},

]

const router = createRouter({
	history:createWebHistory(),
	routes
})

//2.1路由守卫，每次跳转之前判断
//登录页面公开，管理页面需要登陆权限
router.beforeEach((to,from,next) => {
	if(to.path === '/login'){
		next()
	}
	else{
		//如果登陆成功，放行	next()
		//否则重定向到登陆页面login
		if(!localStorage.getItem("token")){
			next({
				path:'/login'
			})
		}else{
			//isGetterRouter为假时，配置router
			if(!store.state.isGetterRouter){
				
				//删除所有的嵌套路由
				//mainbox
				router.removeRoute("mainbox")
				
				
				ConfigRouter()
				next({
					path:to.fullPath
				})
			}else{
				next()
			}
		}
	}
})

//checkPermission(item)为true再将这个添加进routes
const ConfigRouter = ()=>{
	
	if(!router.hasRoute("mainbox")){
		router.addRoute({
			path:'/mainBox',
			name:'MainBox',
			component:MainBox
			//MainBox嵌套路由，后面根据权限动态添加
		})
	}
	
	RoutesConfig.forEach(item => {
		checkPermission(item) && router.addRoute("MainBox",item)
	})
	//改变isGetterRouter = true
	store.commit("changeGetterRouter",true)
}

//如果item当中有requireAdmin进行判断
//role === 1返回true（amdin可以操作）
//否则为false
const checkPermission = (item) => {
	if(item.requireAdmin){
		return store.state.userInfo.role === 1
	}
	return true
}

export default router