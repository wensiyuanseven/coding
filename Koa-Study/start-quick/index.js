const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {
  debugger
  ctx.body = 'hello koa2'
})

app.listen(3020, () => {
  console.log('[demo] start-quick is starting at port 3000')
})

