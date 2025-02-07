var express = require('express');
const ProductController = require("../../controllers/admin/ProductController");
var ProductRouter = express.Router();

//图片上传模块    dest代表图片存放到的文件夹位置
const fs = require('fs')
const multer  = require('multer');
const path = require('path');

// 目标目录
const uploadDir = path.join(__dirname, '../../public/products_cover_uploads/');

// 检查并创建目录
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 配置 Multer
const upload = multer({ dest: uploadDir });

//涉及文件上传，普通post不行，需要上传multer中间件
ProductRouter.post("/adminapi/product/add",upload.single("file"),ProductController.add)
ProductRouter.get("/adminapi/product/list",ProductController.getList)
ProductRouter.get("/adminapi/product/list/:id",ProductController.getList)
ProductRouter.get("/adminapi/product/list/:id/image",ProductController.getImage)
ProductRouter.delete("/adminapi/product/list/:id",ProductController.delList)



module.exports = ProductRouter

