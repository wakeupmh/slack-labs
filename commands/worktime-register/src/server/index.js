import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import compress from 'koa-compress'
import cors from '@koa/cors'
import router from '../routes'

const server = new Koa()

server
  .use(bodyParser())
  .use(helmet())
  .use(compress())
  .use(cors())

server.use(router.routes())

export default server
