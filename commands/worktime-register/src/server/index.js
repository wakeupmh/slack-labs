import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import compress from 'koa-compress'
import cors from '@koa/cors'
import router from '../routes'
import pino from 'koa-pino-logger'
const server = new Koa()

server
  .use(bodyParser())
  .use(helmet())
  .use(compress())
  .use(cors())
  .use(pino())

server.use(router.routes())

export default server
