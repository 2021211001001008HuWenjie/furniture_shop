import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
 plugins: [vue()],
   server:{
   	  host:'0.0.0.0',
   	  port: 8088, //端口号
   	  open: true, //启动后是否自动打开浏览器
	  proxy: {
	    "/adminapi": {
	      target: 'http://127.0.0.1:3000',
	      changeOrigin: true,
	      rewrite: (path) => path.replace(/^\/api/, '')
	    }
	  }
   },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve('./src')
      }
    ],
    extensions: ['.js', '.json', '.ts', '.vue'] // 使用路径别名时想要省略的后缀名，可以自己增减
  }
})