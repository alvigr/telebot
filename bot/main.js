const Telegraf = require('telegraf')
const store = require('./store.js')

const bot = new Telegraf('874168391:AAFNfF0eMO-zd-KwyorWvnYpogGERwZJ5RI')

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

const generateKey = () => {
  const symbols = 'qwertyuiopasdfghjklzxcvbnm1234567890'
  let key = ''
  for (let i = 0; i < 32; i++) {
    key += symbols[getRandomInt(0, symbols.length - 1)]
  }
  return key
}


const getData = (ctx) => {
  let fullMessage = ctx.message.text.split(' ')
  return {
    username: ctx.message.from.username,
    value: Number(fullMessage[0].substring(1)),
    comment: fullMessage.slice(1).join(' ')
  }
}

const replyBalance = (ctx, username) => {
  store.getBalance(username,(err, row) => {
    console.log(row,err)
    ctx.reply("Доход: " + row.income + " Расход: " + row.expense)
  })
}

const replyHistory = (ctx) => {
  const username = ctx.message.from.username
  store.history(username, (err, rows) => {
    console.log(err, rows)
    let replyHistoryWithComments = rows.map((transaction) => {
      if (transaction.comment === '') {
        return transaction.amount
      }
      return transaction.amount + ' - ' + transaction.comment
    })
    ctx.reply('История доходов и расходов:\n\n' + replyHistoryWithComments.join("\n"))
  })
}

const keyCommand = (ctx) => {
  const key = generateKey()
  store.setSecret(ctx.message.from.username, key).then(() => {
    ctx.reply('Ваш ключ: ' + key)
  }).catch(() => {
    ctx.reply('Сервис недоступен')
  })
}

const addIncome = (ctx, username, value, comment) => {
  console.log("Увеличить доход", value)
  if (value) {
    store.addTransaction(username, value, comment)
    replyBalance(ctx, username)
  } else {
    ctx.reply("Вы ввели неправильное значение! Я понимаю только числа со знаком плюс или минус в начале!")
  }
}

const addExpense = (ctx, username, value, comment) => {
  console.log("Увеличить расход", value)
  if (value) {
    store.addTransaction(username, value*(-1), comment)
    replyBalance(ctx, username)
  } else {
    ctx.reply("Вы ввели неправильное значение! Я понимаю только числа со знаком плюс или минус в начале!")
  }
}

const createHandler = (handler, descr) => {
  return (ctx) => {
    console.log(descr, ctx.message.text)
    let data = getData(ctx)
    handler(ctx, data.username, data.value, data.comment)
  }
}

bot.hears(/^\+/, createHandler(addIncome, 'Увеличить доход'))
bot.hears(/^-/, createHandler(addExpense, 'Увеличить расход'))

bot.command('history', replyHistory)
bot.command('key', keyCommand)

console.log("Сервер бота запущен")

bot.launch()
