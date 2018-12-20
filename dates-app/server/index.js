const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const cors = require('koa-cors')

app.use(bodyParser())
app.use(cors())
if(process.env.NODE_ENV = 'test') {
  const logger = require('koa-logger')
  app.use(logger())
}

app.use(require('./routes')())

const PORT = 8081

app.listen(PORT)

console.log('server start on port ' + PORT)