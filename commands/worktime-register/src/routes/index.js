import dotenv from 'dotenv'
import Router from 'koa-router'
import { WebClient } from '@slack/web-api'
dotenv.config()

const token = process.env.SLACK_TOKEN
const web = new WebClient(token, { retries: 0 })

const router = new Router()

// router.post('/register', async ctx => {
//   ctx.body = ctx.request.body
// })

router.post('/slack/register', (ctx) => {
  const { trigger_id: triggerId } = ctx.request.body

  ctx.response.status = 200
  ctx.response.body = ctx.request.body
  ctx.log.info('Slack register');
  (async () => {
    // Open a modal.
    await web.views.open({
      trigger_id: triggerId,
      view: {
        type: 'modal',
        title: {
          type: 'plain_text',
          text: 'Registro de ponto'
        },
        submit: {
          type: 'plain_text',
          text: 'Registrar'
        },
        callback_id: 'worktime-register',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'plain_text',
              text: ':alarm_clock: Utilize os campos abaixo para bater seu ponto',
              emoji: true
            }
          },
          {
            type: 'divider'
          },

          {
            type: 'input',
            block_id: 'login',
            label: {
              type: 'plain_text',
              text: 'Login',
              emoji: true
            },
            element: {
              type: 'plain_text_input',
              multiline: false,
              action_id: 'login',
              placeholder: {
                type: 'plain_text',
                text: 'xpto@dasa.com.br'
              }
            }
          },
          {
            type: 'input',
            block_id: 'senha',
            label: {
              type: 'plain_text',
              text: 'Senha',
              emoji: true
            },
            element: {
              type: 'plain_text_input',
              action_id: 'password',
              placeholder: {
                type: 'plain_text',
                text: '************'
              }
            }
          },
          {
            type: 'input',
            block_id: 'checkin',
            label: {
              type: 'plain_text',
              text: 'Horário de entrada',
              emoji: true
            },
            element: {
              type: 'plain_text_input',
              action_id: 'checkin',
              placeholder: {
                type: 'plain_text',
                text: '09:00'
              }
            }
          },
          {
            type: 'input',
            block_id: 'checkout',
            label: {
              type: 'plain_text',
              text: 'Horário de saída',
              emoji: true
            },
            element: {
              type: 'plain_text_input',
              action_id: 'checkin',
              placeholder: {
                type: 'plain_text',
                text: '19:00'
              }
            }
          }
        ]
      }
    })
  })()
})

router.post('/slack/interactions', (ctx) => {
  ctx.response.status = 200
  ctx.response.body = ''
  const payload = JSON.parse(ctx.request.body.payload)

  ctx.log.info(`Interactions - payload: ${payload}`)

  if (
    payload.type === 'view_submission' &&
    payload.view.callback_id === 'frontdesk'
  ) {
    const { values } = payload.view.state
    ctx.log.info(`Interactions - values retrieved: ${values}`)
  }
})
export default router
