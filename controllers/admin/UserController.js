const UserService = require("../../services/admin/UserService");
const JWT = require("../../util/JWT");


const UserController = {
    login:async (req,res) => {
        // console.log(req.body)
        //req.body
        var result = await UserService.login(req.body)
        //返回长度为0（即为无结果），表示未登陆成功；反之OK
        if(result.length === 0){
           res.send({
               code:"-1",
               error:"用户名密码不匹配"
           })
        }else{
            console.log(result)
            //生成token并封装在header
            const token = JWT.generate({
                id:result[0].id,
                username:result[0].username
            },"1d")

            res.header("Authorization",token)
            res.send({
                ActionType:"OK",
                data:{
                    username: result[0].username,
                    gender: result[0].gender?result[0].gender:0,
                    //性别 0保密，1，2
                    introduction: result[0].introduction,
                    avatar: result[0].avatar,
                    role: result[0].role,
                }
            })
        }
    },

    upload:async (req,res) => {
        const { username, introduction,gender } = req.body
        const token = req.headers["authorization"].split(" ")[1]
        const avatar = `/avatar_uploads/${req.file.filename}`
        var payload = JWT.verify(token)
        // console.log(payload.id)
        // 调用service的更新模块
        await UserService.upload({id:payload.id,username,introduction,gender:Number(gender),avatar})
        res.send({
            ActionType:"OK",
            data:{
                username,introduction,
                gender:Number(gender),
                avatar
            }
        })
    }
}

module.exports = UserController