const Telegraf = require('telegraf')

const bot = new Telegraf('874168391:AAFNfF0eMO-zd-KwyorWvnYpogGERwZJ5RI')

let store = {};

const addIncome = (ctx) => {
    console.log("Увеличить доход либо расход", ctx.message.text)
    console.log(ctx.message.text.substring(0, 1))
    let username = ctx.message.from.username
    if (store[username]) {
      if (ctx.message.text.substring(0, 1) === '+') {
        store[username].income += Number(ctx.message.text.substring(1))
      } else {
        store[username].expense += Number(ctx.message.text.substring(1))
      }
    } else {
      store[username] = {
        income: 0,
        expense: 0
      }
      if (ctx.message.text.substring(0, 1) === '+') {
        store[username].income = Number(ctx.message.text.substring(1))
      } else {
        store[username].expense = Number(ctx.message.text.substring(1))
      }
    }
    ctx.reply("Доход: " + store[username].income + " Расход: " + store[username].expense)
}

bot.hears(/[+-]/, addIncome)

console.log("Сервер бота запущен")

bot.launch()
