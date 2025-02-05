const UserModel = require("../../models/UserModel")

const UserService = {
    login:async({username, password}) => {
        return UserModel.find({
            username,
            password
            })
    },

    upload:async ({id,username,introduction,gender,avatar}) => {
        if(avatar){
            return UserModel.update({
                id
            },{
                username,introduction,gender,avatar
            })
        }else{
            return UserModel.update({
                id
            },{
                username,introduction,gender
            })
        }
    },

    add:async ({username,password,introduction,role,gender,avatar}) => {
        return UserModel.create({
            username, password, gender, introduction, avatar, role
        })
    },

    //注意不返回用户密码password字段，提高安全性
    getList:async ({id}) => {
        return id
            ?UserModel.find({id:id},["id","username","role","password","introduction"])
            :UserModel.find({},["id","username","role","gender","introduction","avatar"])
    },

    delList:async (id) => {
        return UserModel.delete(id)
    },

    putList:async (body) => {
        return UserModel.update({id:body.id},body)
    }


}

module.exports = UserService