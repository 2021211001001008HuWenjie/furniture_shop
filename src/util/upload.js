import axios from 'axios'

function upload(path,userForm){
	const params = new FormData()
	for(let i in userForm){
		params.append(i,userForm[i])
	}
	// console.log(params)
	//通过axios的post将数据传给后端处理
	return axios.post(path,params,{
		headers:{
			"Content-Type":"multipart/form-data"
		}
	}).then(res => res.data)
}

export default upload