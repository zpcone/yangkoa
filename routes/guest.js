/**
 * Created by Administrator on 2018/3/20 0020.
 */

var router=require('koa-router')();

router.get('/',(ctx)=>{

    ctx.body={"title":"这是一个api"};
})

router.get('/newslist',(ctx)=>{

    ctx.body={"title":"这是一个新闻接口"};
})

router.get('/focus',(ctx)=>{

    ctx.body={"title":"这是一个轮播图的api"};
})
router.get('/getAllGuest',async(ctx)=>{
    var result=await DB.find('guest')
    console.log(result)
})

module.exports=router.routes();