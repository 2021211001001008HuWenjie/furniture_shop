var express = require('express');
const UserController = require("../../controllers/admin/UserController");
var userRouter = express.Router();
//图片上传模块    dest代表图片存放到的文件夹位置
const fs = require('fs')
const multer  = require('multer');
const path = require('path');

console.log('Upload directory:', path.join(__dirname, '../../public/avatar_uploads/'));
// 目标目录
const uploadDir = path.join(__dirname, '../../public/avatar_uploads/');

// 检查并创建目录
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 配置 Multer
const upload = multer({ dest: uploadDir });


/* GET home page. */
userRouter.post("/adminapi/user/login",UserController.login)
//★每次刷新出发这个get请求，axios拦截器刷新一次token
userRouter.get("/adminapi/user/home",(req,res) => {
    res.send({ok:1})
})
userRouter.post("/adminapi/user/upload",upload.single('file'),UserController.upload)

module.exports = userRouter;