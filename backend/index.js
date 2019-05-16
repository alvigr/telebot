const sqlite3 = require('sqlite3').verbose()
const fastify = require('fastify')({
  logger: true
})
fastify.register(require('fastify-cors'), {})

const db = new sqlite3.Database('db.sqlite')

fastify.addHook('preHandler', (request, reply, next) => {
  console.log('Авторизация')
  let secret = request.headers.secret.split(':')
  const [username, key] = secret
  db.get(
    'SELECT key FROM secrets WHERE username = ? AND key = ?',
    username, key, (err, row) => {
      if (row) {
        request.params.username = username
        request.params.key = key
        request.params.bot = false
        if (username === 'bot') {
          request.params.username = request.headers['original-username']
          request.params.bot = true
        }
        console.log(username, request.params.username)
        next()
      } else {
        reply.code(403)
        reply.send({error: 'Неправильный логин или пароль'})
      }
    }
  )
})

// Declare a route
fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' })
})

fastify.get('/transactions', (request, reply) => {
  db.all(
    'SELECT amount, comment FROM transactions WHERE username = ? ORDER BY id', request.params.username, (err, rows) => {
      console.log(err)
      reply.send(rows)
    }
  )
})

fastify.post('/transactions', (request, reply) => {
  console.log(request.body)
  db.run(
    "INSERT INTO transactions (username, amount, comment) VALUES (?, ?, ?)",
    request.params.username, request.body.amount, request.body.comment
  )
  reply.send({status: 'ok'})
})

fastify.post('/secrets', (request, reply) => {
  if (request.params.bot === false) {
    reply.code(403)
    reply.send({error:'Доступ запрещен'})
  }
  console.log(request.body)
  db.get(
    'SELECT key FROM secrets WHERE username = ?',
    request.body.username, (err, row) => {
      console.log(err)
      console.log(row)
      if (row) {
        db.run(
          'UPDATE secrets SET key = ? WHERE username = ?',
          request.body.key, request.body.username
        )
      } else {
        db.run(
          'INSERT INTO secrets (username, key) VALUES (?, ?)',
          request.body.username, request.body.key
        )
      }
      reply.send({status: 'ok'})
    }
  )
})

fastify.get('/balance', (request, reply) => {
    db.get("SELECT SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) AS income, " +
      "SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END) AS expense  " +
      "FROM transactions WHERE username = ?", request.params.username, (err, row) => {
      console.log(err)
      reply.send(row)
    })
}
)

// Run the server!
fastify.listen(3000, (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
})
