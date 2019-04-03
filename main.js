const Telegraf = require('telegraf')

const bot = new Telegraf('874168391:AAFNfF0eMO-zd-KwyorWvnYpogGERwZJ5RI')

let store = {};

const getUserStore = (ctx) => {
  let username = ctx.message.from.username
  if (!store[username]) {
    store[username] = {
      income: 0,
      expense: 0,
      history: [],
      comments: []
    }
  }
  return store[username]
}

const replyBalance = (ctx, userStore) => {
  ctx.reply("Доход: " + userStore.income + " Расход: " + userStore.expense)
}

const replyHistory = (ctx) => {
  let userStore = getUserStore(ctx)
  let replyHistoryWithComments = []
  for (let valueId = 0; valueId < userStore.history.length; valueId++) {
    replyHistoryWithComments.push(userStore.history[valueId] + userStore.comments[valueId])
  }
  ctx.reply('История доходов и расходов:\n' + replyHistoryWithComments.join("\n"))
}

const addIncome = (ctx, value, comment) => {
  console.log("Увеличить доход", value)
  if (value) {
    let userStore = getUserStore(ctx)
    userStore.income += value
    userStore.history.push('+' + value)
    userStore.comments.push(' - ' + comment)
    replyBalance(ctx, userStore)
  } else {
    ctx.reply("Вы ввели неправильное значение! Я понимаю только числа со знаком плюс или минус в начале!")
  }
}

const addExpense = (ctx, value, comment) => {
  console.log("Увеличить расход", value)
  if (value) {
    let userStore = getUserStore(ctx)
    userStore.expense += value
    userStore.history.push('-' + value)
    userStore.comments.push(' - ' + comment)
    replyBalance(ctx, userStore)
  } else {
    ctx.reply("Вы ввели неправильное значение! Я понимаю только числа со знаком плюс или минус в начале!")
  }
}

const addIncomeWithSign = (ctx) => {
  console.log("Увеличить доход", ctx.message.text)
  let fullMessage = ctx.message.text.split(' ')
  let value = Number(fullMessage[0].substring(1))
  let comment = fullMessage.slice(1).join(' ')
  console.log(comment)
  addIncome(ctx, value, comment)
}

const addExpenseWithSign = (ctx) => {
  console.log("Увеличить расход", ctx.message.text)
  let fullMessage = ctx.message.text.split(' ')
  let value = Number(fullMessage[0].substring(1))
  let comment = fullMessage.slice(1).join(' ')
  console.log(comment)
  addExpense(ctx, value, comment)
}

const addIncomeCommand = (ctx) => {
  console.log("Увеличить доход", ctx.message.text)
  let fullMessage = ctx.message.text.split(' ')
  let value = Number(fullMessage[1])
  let comment = fullMessage.slice(2).join(' ')
  console.log(comment)
  addIncome(ctx, value, comment)
}

const addExpensCommand = (ctx) => {
  console.log("Увеличить расход", ctx.message.text)
  let fullMessage = ctx.message.text.split(' ')
  let value = Number(fullMessage[1])
  let comment = fullMessage.slice(2).join(' ')
  console.log(comment)
  addExpense(ctx, value, comment)
}

bot.hears(/^\+/, addIncomeWithSign)
bot.hears(/^-/, addExpenseWithSign)

bot.command('income', addIncomeCommand)
bot.command('expense', addExpensCommand)
bot.command('history', replyHistory)

console.log("Сервер бота запущен")

bot.launch()
