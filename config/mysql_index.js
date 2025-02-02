let mysql = require("mysql");
//创建连接
let connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"111111",
    database:"demo"
});
//开始连接
connection.connect((err) => {
    if(err){
        console.error("连接失败:" + err.stack);
        return;
    }
    console.log("连接成功！")
});

//关闭连接
connection.end();
/*
connection.query("select * from users",(err , result) => {
    if(err){
        console.error("查询出错了" + err.message);
        return;
    }
    console.log(result);
});

let sql = "insert into users(id,username,password) value (?,?,?)";
let params = ["0","zhao6","1"]

connection.query(sql,params,(err, result) => {
        if(err){
            console.error("插入出错了" + err.message);
            return;
        }
        console.log("插入成功！");
    }
)

*/

//强制关闭连接，无论语句是否执行
// connection.destroy