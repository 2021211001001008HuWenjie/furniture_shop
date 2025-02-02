const jsonwebtoken = require("jsonwebtoken");
const secret = "2025"

const JWT = {
    // 生成token
    generate(value,exprires){// 加密信息,过期时间
        return jsonwebtoken.sign(value,secret,{expiresIn:exprires})
    },
    // 验证token
    verify(token){// 判断token
        try{
            return jsonwebtoken.verify(token,secret)
        }catch(e){
            return false
        }
    }
}

module.exports = JWT