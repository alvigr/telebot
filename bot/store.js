const axios = require('axios').create({
  baseURL: 'http://127.0.0.1:3000'
})

exports.addTransaction = (username, value, comment) => {
  axios.post('/transactions', {
    amount: value,
    comment
  })
    .then(() => {
      console.log('Запись добавлена')
  })
}

exports.getBalance = (username, handler) => {
  axios.get('/balance')
    .then((response) => {
      handler(null, response.data)
  })
}

exports.history = (username, handler) => {
  axios.get('/transactions')
    .then((response) => {
      handler(null, response.data)
  })
}

exports.setSecret = (username, key) => {
  return axios.post('/secrets', {
    username,
    key
  })
}