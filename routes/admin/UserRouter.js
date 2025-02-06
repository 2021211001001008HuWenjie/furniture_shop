var express = require('express');
const UserController = require("../../controllers/admin/UserController");
var UserRouter = express.Router();
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
UserRouter.post("/adminapi/user/login",UserController.login)
//★每次刷新出发这个get请求，axios拦截器刷新一次token
UserRouter.get("/adminapi/user/home",(req,res) => {
    res.send({ok:1})
})
UserRouter.post("/adminapi/user/upload",upload.single('file'),UserController.upload)
UserRouter.post("/adminapi/user/add",upload.single('file'),UserController.add)
// 实现用户列表的增删改查
UserRouter.get("/adminapi/user/list",UserController.getList)
UserRouter.get("/adminapi/user/list/:id",UserController.getList)
UserRouter.put("/adminapi/user/list/:id",UserController.putList)
UserRouter.delete("/adminapi/user/list/:id",UserController.delList)


module.exports = UserRouter;