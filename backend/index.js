const sqlite3 = require('sqlite3').verbose()
const fastify = require('fastify')({
  logger: true
})

const db = new sqlite3.Database('db.sqlite')

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
    'backend', request.body.amount, request.body.comment
  )
  reply.send({status: 'ok'})
})

// Run the server!
fastify.listen(3000, (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
})
