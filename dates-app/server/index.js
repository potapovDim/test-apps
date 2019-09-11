var Koa = require('koa');
var bodyParser = require('koa-bodyparser');

var app = new Koa();
app.use(bodyParser());

app.use(async ctx => {
  console.log('!!!!!!!!!!!!!!!!')
  // the parsed body will store in ctx.request.body
  // if nothing was parsed, body will be an empty object {}
  const {request: {body}} = ctx
  ctx.body = ctx.request.body;
  console.log(body)
  ctx.body = {
    a: 'b'
  }
  return ctx
});
const PORT = 8081

app.listen(PORT)

console.log('server start on port ' + PORT)