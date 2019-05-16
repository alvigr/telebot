const axios = require('axios').create({
  baseURL: 'http://127.0.0.1:3000'
})

axios.defaults.headers.common['Secret'] = 'bot:vghyfthtrdtdhdjrtyjdy455rytyt5t5' // INSERT INTO "secrets" ("username", "key") VALUES ('bot', 'vghyfthtrdtdhdjrtyjdy455rytyt5t5')

exports.addTransaction = (username, value, comment) => {
  axios.post('/transactions', {
    amount: value,
    comment
  }, {
    headers: {'Original-Username': username}
  })
    .then(() => {
      console.log('Запись добавлена')
  })
}

exports.getBalance = (username, handler) => {
  axios.get('/balance', {
    headers: {'Original-Username': username}
  })
    .then((response) => {
      handler(null, response.data)
  })
}

exports.history = (username, handler) => {
  axios.get('/transactions', {
    headers: {'Original-Username': username}
  })
    .then((response) => {
      handler(null, response.data)
  })
}

exports.setSecret = (username, key) => {
  return axios.post('/secrets', {
    username,
    key
  }, {
    headers: {'Original-Username': username}
  })
}