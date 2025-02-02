var express = require('express');
const UserController = require("../../controllers/admin/UserController");
var userRouter = express.Router();



/* GET home page. */
userRouter.post("/adminapi/user/login",UserController.login)
userRouter.get("/adminapi/user/home",(req,res) => {
    res.send({ok:1})
})

module.exports = userRouter;