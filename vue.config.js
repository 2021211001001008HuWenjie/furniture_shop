//在vite.config.js里面的sever下添加代理
// proxy: {
// 	    "/users": {
// 	      target: 'http://127.0.0.1:3000',
// 	      changeOrigin: true,
// 	      rewrite: (path) => path.replace(/^\/api/, '')
// 	    }
// 	  }
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	transplieDependencies: true,
	
	devServer:{
		proxy:{
			"/adminapi":{
				target:"http://localhost:3000",
				changeOrigin:true
			}
		}
	}
})