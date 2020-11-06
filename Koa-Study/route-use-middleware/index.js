const Koa = require('koa')
const fs = require('fs')
const app = new Koa()
const router = require('./routers/index')

app.use(router.routes()).use(router.allowedMethods())

app.listen(3005, () => {
    console.log('[demo] route-use-middleware is starting at port 3000')
})

