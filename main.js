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
    }
  }
  return store[username]
}

const getData = (ctx) => {
  let fullMessage = ctx.message.text.split(' ')
  let data = {
    value: Number(fullMessage[0].substring(1)),
    valueToCommand: Number(fullMessage[1]),
    comment: fullMessage.slice(1).join(' '),
    commentToCommand: fullMessage.slice(2).join(' ')
  }
  return data
}

const replyBalance = (ctx, userStore) => {
  ctx.reply("Доход: " + userStore.income + " Расход: " + userStore.expense)
}

const replyHistory = (ctx) => {
  let userStore = getUserStore(ctx)
  let replyHistoryWithComments = userStore.history.map((transaction) => {
    return transaction.value + ' - ' + transaction.comment
  })
  ctx.reply('История доходов и расходов:\n\n' + replyHistoryWithComments.join("\n"))
}

const addIncome = (ctx, value, comment) => {
  console.log("Увеличить доход", value)
  if (value) {
    let userStore = getUserStore(ctx)
    userStore.income += value
    userStore.history.push({
      value: '+' + value,
      comment
    })
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
    userStore.history.push({
      value: '-' + value,
      comment
    })
    replyBalance(ctx, userStore)
  } else {
    ctx.reply("Вы ввели неправильное значение! Я понимаю только числа со знаком плюс или минус в начале!")
  }
}

const addIncomeWithSign = (ctx) => {
  console.log("Увеличить доход", ctx.message.text)
  let data = getData(ctx)
  addIncome(ctx, data.value, data.comment)
}

const addExpenseWithSign = (ctx) => {
  console.log("Увеличить расход", ctx.message.text)
  let data = getData(ctx)
  addExpense(ctx, data.value, data.comment)
}

const addIncomeCommand = (ctx) => {
  console.log("Увеличить доход", ctx.message.text)
  let data = getData(ctx)
  addIncome(ctx, data.valueToCommand, data.commentToCommand)
}

const addExpensCommand = (ctx) => {
  console.log("Увеличить расход", ctx.message.text)
  let data = getData(ctx)
  addExpense(ctx, data.valueToCommand, data.commentToCommand)
}

bot.hears(/^\+/, addIncomeWithSign)
bot.hears(/^-/, addExpenseWithSign)

bot.command('income', addIncomeCommand)
bot.command('expense', addExpensCommand)
bot.command('history', replyHistory)

console.log("Сервер бота запущен")

bot.launch()
