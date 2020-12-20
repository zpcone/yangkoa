
const Koa=require('koa'),

     router=require('koa-router')(),
    render = require('koa-art-template'),
    path=require('path');
    bodyParser=require('koa-bodyparser'),
    session = require('koa-session')
    // cors = require('koa-cors'); 
    DB=require('./module/db.js');

//引入子模块
// const cors = require('koa-cors');  
var admin=require('./routes/admin.js');
var guest=require('./routes/guest.js');
var index=require('./routes/index.js');

var app=new Koa();
app.use(bodyParser());

app.keys = ['some secret hurr']
const CONFIG = {
  key: 'token',
  maxAge: 86400000,
  autoCommit: true,
  path:"/",  
  overwrite: true,
  httpOnly: false,
  signed: true,
  rolling: false,
  renew: false
}

app.use(session(CONFIG, app))
//配置koa-art-template 模板引擎
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});
// app.use(cors({
//     origin:'http://localhost:9528',
//     credentials:true,
//     exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//     allowMethods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
//     allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
//  }));
//配置路由
router.use(index);
/*
  /admin   配置子路由  层级路由

 /admin/user
 */
router.use('/admin',admin);
/*
 /api/newslist   新闻列表的api
 */
router.use('/guest',guest);   /*在模块里面暴露路由并且启动路由*/

//启动路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);









