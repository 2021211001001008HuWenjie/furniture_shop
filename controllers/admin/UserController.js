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
        const avatar = req.file?`/avatar_uploads/${req.file.filename}`:""
        var payload = JWT.verify(token)
        // console.log(payload.id)
        // 调用service的更新模块
        //注意avatar判空
        await UserService.upload({id:payload.id,username,introduction,gender:Number(gender),avatar})
        if(avatar){
            res.send({
                ActionType:"OK",
                data:{
                    username,introduction,
                    gender:Number(gender),
                    avatar
                }
            })
        }else {
            res.send({
                ActionType:"OK",
                data:{
                    username,introduction,
                    gender:Number(gender),
                }
            })
        }
    },

    add:async (req,res) => {
        const { username,password,introduction,gender,role } = req.body
        const avatar = req.file?`/avatar_uploads/${req.file.filename}`:""
        // 调用service的更新模块
        //注意avatar判空
        await UserService.add({username,password,introduction,role:Number(role),gender:Number(gender),avatar})
        res.send({
            ActionType:"OK",
        })
    },

    getList:async (req,res) => {
        const result = await UserService.getList(req.params)
        res.send({
            ActionType:"OK",
            data:result
        })
    },

    delList:async (req,res) => {
        const result = await UserService.delList({id:req.params.id})
        console.log(req.params.id)
        res.send({
            ActionType:"OK",
        })
    },

    putList:async (req,res) => {
        console.log(req.body)
        const result = await UserService.putList(req.body)
        res.send({
            ActionType:"OK",
        })
    },
}

module.exports = UserController