var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const userRouter = require("./routes/admin/UserRouter");
const JWT = require("./util/JWT");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

/*  adminapi - 后台管理api
    webapi - 官网系统api
    在app.js里面注册调用
    */

app.use((req,res,next) => {
  //如果Token有效，next()
  //如果Token过期了，返回401错误
  //将login排除在外
  if(req.url === "/adminapi/user/login"){
    next()
    return;
  }
  // 在axios请求拦截器里设置的req.headers可以用空格切割成两部分，后面那部分就是token
  const token = req.headers["authorization"].split(" ")[1]
  const payload = JWT.verify(token)
  console.log(payload)
  // token解析
  if(token){
    // console.log(payload)
    if(payload){
      // 每一次请求,重新生成新的token
      const newToken = JWT.generate({
        id: payload.id,
        username: payload.username
      }, "1d"); // 生成新的 Token
      console.log(newToken)
      res.header("Authorization", newToken); // 设置响应头
      next(); // 继续处理请求
    }else{
      res.status(401).send({errCode:"-1",errorInfo:"token过期"})
    }
  }

})
app.use(userRouter)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
