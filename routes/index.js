/**
 * Created by Administrator on 2018/3/20 0020.
 */

var router=require('koa-router')();
DB=require('../module/db.js');
router.post('/ceshi',async (ctx)=>{
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
    // console.log(result);
})
// 用户登录的方法
router.post('/login',async (ctx)=>{
    function uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
    
        var uuid = s.join("");
        return uuid;
    }
    console.log(ctx.request.body.username)
    let username = ctx.request.body.username
    let password = ctx.request.body.password
    var result=await DB.find('user')
    console.log(result)
    var status = false
    for (let i = 0; i < result.length; i++) {
        if(result[i].username == username){
            if(result[i].password == password){
                console.log('设置token')
                ctx.cookies.set('token',uuid(),{
                    maxAge:60*1000*60,
                    path:'http://localhost:9528',  /*配置可以访问的页面*/
                    domain:'/',  /*正常情况不要设置 默认就是当前域下面的所有页面都可以方法*/
                    httpOnly:false,  //true表示这个cookie只有服务器端可以访问，false表示客户端（js），服务器端都可以访问
                })
                console.log(uuid())
                status = true
            }
        }
    }
    if(status){
        ctx.body ={
            code:200,
            data:{
                status:true
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