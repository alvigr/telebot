const Telegraf = require('telegraf')

const bot = new Telegraf('874168391:AAFNfF0eMO-zd-KwyorWvnYpogGERwZJ5RI')

let store = {};

const addIncome = (ctx) => {
    console.log("Увеличить доход", ctx.message.text)
    let username = ctx.message.from.username
    if (store[username]) {
      store[username].income += Number(ctx.message.text.substring(1))
    } else {
      store[username] = {
        income: 0,
        expense: 0
      }
      store[username].income = Number(ctx.message.text.substring(1))
    }
    ctx.reply("Доход: " + store[username].income + " Расход: " + store[username].expense)
}

const addExpense = (ctx) => {
    console.log("Увеличить расход", ctx.message.text)
    let username = ctx.message.from.username
    if (store[username]) {
      store[username].expense += Number(ctx.message.text.substring(1))
    } else {
      store[username] = {
        income: 0,
        expense: 0
      }
      store[username].expense = Number(ctx.message.text.substring(1))
    }
    ctx.reply("Доход: " + store[username].income + " Расход: " + store[username].expense)
}

bot.hears(/^\+/, addIncome)
bot.hears(/^-/, addExpense)

console.log("Сервер бота запущен")

bot.launch()
