import axios from 'axios'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
	
	const token = localStorage.getItem("token")
	config.headers.Authorization = `Bearer ${token}`; // 注意使用反引号（`）
	
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
	
	// console.log('拦截器起作用!');
	// const {authorization } = response.headers
	// authorization && localStorage.setItem("token",authorization)
	
 //    return response;
	
	console.log('拦截器起作用!');
	  const { authorization } = response.headers;
	  if (authorization) {
	    console.log('收到新的 Token:', authorization);
	    localStorage.setItem("token", authorization); // 保存新的 Token
	  } else {
	    console.log('未收到新的 Token');
	  }
	    return response;
	
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
	//Token过期了跳转到login页面
	const { status } = error.response
	if(status === 401){
		localStorage.removeItem("token")
		window.location.href = '/login'
	}
	
    return Promise.reject(error);
  });