/**
 * Created by Administrator on 2018/3/20 0020.
 */
const tools = require('../module/tools.js');
var router=require('koa-router')();
DB=require('../module/db.js');
router.get('/ceshi',async (ctx)=>{
    var result=await DB.find('user');
    console.log(result)
    for (let i = 0; i < result.length; i++) {
        if(result[i].username == 'zpc'){
            console.log('存在')
        }
    }
    ctx.body={
        code:200,
        data:{
            status:result
        }   
    }
})
// 用户登录的方法
router.post('/doLogin',async (ctx)=>{
    console.log(ctx.session.userinfo)
    let username = ctx.request.body.username
    let password = ctx.request.body.password
    var result=await DB.find('user',{"username":username,"password":tools.md5(password)});
    var status = false
    if(result.length>0){
        ctx.session.userinfo=result[0]; // 存session
        status = true
    }
    if(status){
        ctx.body ={
            code:200,
            data:{
                status:true,
                userInfo:{
                    username:ctx.request.body.username,
                    password:ctx.request.body.password
                }
            }
        }
    } else {
        ctx.body ={
            code:50008,
            data:{
                status:false
            }
        }
    }
})

//注意 前台后后台匹配路由的写法不一样
router.get('/case',(ctx)=>{
    ctx.body='案例'
})
//注意 前台后后台匹配路由的写法不一样
// router.post('/login',(ctx)=>{

//     ctx.body='案例'
// })

router.get('/about',async (ctx)=>{

    await ctx.render('default/about');
})

module.exports=router.routes();