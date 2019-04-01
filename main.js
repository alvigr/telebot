const Telegraf = require('telegraf')

const bot = new Telegraf('874168391:AAFNfF0eMO-zd-KwyorWvnYpogGERwZJ5RI')

let store = {};

const addIncome = (ctx, value) => {
  console.log("Увеличить доход", value)
  let username = ctx.message.from.username
  if (value) {
    if (!store[username]) {
      store[username] = {
        income: 0,
        expense: 0
      }
    }

    store[username].income += value

    ctx.reply("Доход: " + store[username].income + " Расход: " + store[username].expense)
  } else {
    ctx.reply("Вы ввели неправильное значение! Я понимаю только числа со знаком плюс или минус в начале!")
  }
}

const addExpense = (ctx, value) => {
  console.log("Увеличить расход", value)
  let username = ctx.message.from.username
  if (value) {
    if (!store[username]) {
      store[username] = {
        income: 0,
        expense: 0
      }
    }

    store[username].expense += value

    ctx.reply("Доход: " + store[username].income + " Расход: " + store[username].expense)
  } else {
    ctx.reply("Вы ввели неправильное значение! Я понимаю только числа со знаком плюс или минус в начале!")
  }
}

const addIncomeWithSign = (ctx) => {
  console.log("Увеличить доход", ctx.message.text)
  let value = Number(ctx.message.text.substring(1))
  addIncome(ctx, value)
}

const addExpenseWithSign = (ctx) => {
  console.log("Увеличить расход", ctx.message.text)
  let value = Number(ctx.message.text.substring(1))
  addExpense(ctx, value)
}

const addIncomeCommand = (ctx) => {
  console.log("Увеличить доход", ctx.message.text)
  let value = Number(ctx.message.text.split(" ")[1])
  addIncome(ctx, value)
}

const addExpensCommand = (ctx) => {
  console.log("Увеличить расход", ctx.message.text)
  let value = Number(ctx.message.text.split(" ")[1])
  addExpense(ctx, value)
}

bot.hears(/^\+/, addIncomeWithSign)
bot.hears(/^\-/, addExpenseWithSign)

bot.command('income', addIncomeCommand)
bot.command('expense', addExpensCommand)

console.log("Сервер бота запущен")

bot.launch()
