import {createStore} from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
	state:{
		isGetterRouter:false,
		isCollapsed:false
	},
	getters:{
		
	},
	mutations:{
		changeGetterRouter(state,value){
			state.isGetterRouter = value
		},
		//控制侧边栏展开
		changeCollasped(state){
			state.isCollapsed = !state.isCollapsed
		}
	},
	actions:{
		
	},
	modules:{
		
	},
	plugins:[createPersistedState({
		paths:["isCollapsed"]//控制哪个量是否持久化
	})],
})


