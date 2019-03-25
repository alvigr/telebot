const Telegraf = require('telegraf')

const bot = new Telegraf('874168391:AAFNfF0eMO-zd-KwyorWvnYpogGERwZJ5RI')

let income =0
let expense =0

const addIncome = (ctx) => {
    console.log("Пользователь", ctx.message.from.username,)
    console.log("Увеличить доход", ctx.message.text)
    let transaction = Number(ctx.message.text.substring(1))
    income += transaction
    ctx.reply("Доход: " + income + " Расход: " + expense)
}

const addExpense = (ctx) => {
    console.log("Увеличить расход", ctx.message.text)
}

bot.hears(/^\+/, addIncome)
bot.hears(/^\-/, addExpense)

console.log("Сервер бота запущен")

bot.launch()
