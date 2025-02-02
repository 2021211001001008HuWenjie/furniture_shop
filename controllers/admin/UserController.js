const UserService = require("../../services/admin/UserService");
const JWT = require("../../util/JWT");


const UserController = {
    login:async (req,res) => {
        console.log(req.body)
        //req.body
        var result = await UserService.login(req.body)
        //返回长度为0（即为无结果），表示未登陆成功；反之OK
        if(result.length === 0){
           res.send({
               code:"-1",
               error:"用户名密码不匹配"
           })
        }else{
            //生成token并封装在header
            const token = JWT.generate({
                _id:result[0]._id,
                username:result[0].username
            },"10s")

            res.header("Authorization",token)
            res.send({
                ActionType:"OK"
            })
        }

    }
}

module.exports = UserController