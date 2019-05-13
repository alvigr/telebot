const axios = require('axios')

exports.addTransaction = (username, value, comment) => {
  axios.post('http://127.0.0.1:3000/transactions', {
    amount: value,
    comment
  })
    .then((response) => {
      console.log('Запись добавлена')
  })
}

exports.getBalance = (username, handler) => {
  axios.get('http://127.0.0.1:3000/balance')
    .then((response) => {
      handler(null, response.data)
  })
}

exports.history = (username, handler) => {
  axios.get('http://127.0.0.1:3000/transactions')
    .then((response) => {
      handler(null, response.data)
  })
}

exports.setSecret = (username, key) => {
  return axios.post('http://127.0.0.1:3000/secrets', {
    username,
    key
  })
}