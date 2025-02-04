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

    
}

module.exports = UserService