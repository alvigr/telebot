const Telegraf = require('telegraf')

const bot = new Telegraf('874168391:AAFNfF0eMO-zd-KwyorWvnYpogGERwZJ5RI')

let store = {};

const addIncomeOrExpense = (ctx) => {
  console.log("Увеличить доход или расход", ctx.message.text)
  let username = ctx.message.from.username
  let value = Number(ctx.message.text.substring(1))
  console.log(value)
  if (value) {
    if (!store[username]) {
      store[username] = {
        income: 0,
        expense: 0
      }
    }
    if (ctx.message.text.substring(0, 1) === '+') {
      store[username].income += value
    } else {
      store[username].expense += value
    }
    ctx.reply("Доход: " + store[username].income + " Расход: " + store[username].expense)
  } else {
    ctx.reply("Вы ввели неправильное значение! Я понимаю только числа со знаком плюс или минус в начале!")
  }
}

bot.hears(/[+-]/, addIncomeOrExpense)

bot.command('hipster', Telegraf.reply('λ'))

console.log("Сервер бота запущен")

bot.launch()
