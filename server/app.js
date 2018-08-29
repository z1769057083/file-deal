const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaBody = require('koa-body');
const cors = require("koa-cors");
const convert = require('koa-convert');
const static = require('koa-static-router');
const index = require('./routes/index')
// const {delFile} = require("./fs/delFile")
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(cors())
app.use(koaBody({
    multipart: true,
    // formidable: {
    //     maxFileSize: 2000000*1024*1024    // 设置上传文件大小最大限制，默认2M
    // }
}));
app.use(views(__dirname + '/static', {
    extension: 'html'
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/static'))


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
//定时清空文件夹
// app.use(async (ctx,next)=>{
//     delFile();
//     await next();
// })
// routes
app.use(index.routes(), index.allowedMethods())
//渲染页面
app.use(async function (ctx, next) {
    await ctx.render('index');
});
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
