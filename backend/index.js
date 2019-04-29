const sqlite3 = require('sqlite3').verbose()
const fastify = require('fastify')({
  logger: true
})
fastify.register(require('fastify-cors'), {})

const db = new sqlite3.Database('db.sqlite')
const USERNAME = 'ivan'

// Declare a route
fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' })
})

fastify.get('/transactions', (request, reply) => {
  db.all(
    'SELECT amount, comment FROM transactions ORDER BY id', (err, rows) => {
      console.log(err)
      reply.send(rows)
    }
  )
})

fastify.post('/transactions', (request, reply) => {
  console.log(request.body)
  db.run(
    "INSERT INTO transactions (username, amount, comment) VALUES (?, ?, ?)",
    USERNAME, request.body.amount, request.body.comment
  )
  reply.send({status: 'ok'})
})

fastify.get('/balance', (request, reply) => {
    db.get("SELECT SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) AS income, " +
      "SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END) AS expense  " +
      "FROM transactions WHERE username = ?", USERNAME, (err, row) => {
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
