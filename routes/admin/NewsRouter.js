var express = require('express');
const NewsController = require("../../controllers/admin/NewsController");
var NewsRouter = express.Router();

//图片上传模块    dest代表图片存放到的文件夹位置
const fs = require('fs')
const multer  = require('multer');
const path = require('path');

// 目标目录
const uploadDir = path.join(__dirname, '../../public/news_cover_uploads/');

// 检查并创建目录
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 配置 Multer
const upload = multer({ dest: uploadDir });




//涉及文件上传，普通post不行，需要上传multer中间件
NewsRouter.post("/adminapi/news/add",upload.single("file"),NewsController.add)
NewsRouter.get("/adminapi/news/list",NewsController.getList)
NewsRouter.post("/adminapi/news/list",upload.single("file"),NewsController.updateList)
NewsRouter.get("/adminapi/news/list/:id",NewsController.getList)
NewsRouter.delete("/adminapi/news/list/:id",NewsController.delList)
NewsRouter.put("/adminapi/news/publish",NewsController.publish)


module.exports = NewsRouter

