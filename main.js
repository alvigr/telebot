const Telegraf = require('telegraf')
const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('db.sqlite')
const bot = new Telegraf('874168391:AAFNfF0eMO-zd-KwyorWvnYpogGERwZJ5RI')

const getData = (ctx) => {
  let fullMessage = ctx.message.text.split(' ')
  return {
    value: Number(fullMessage[0].substring(1)),
    valueToCommand: Number(fullMessage[1]),
    comment: fullMessage.slice(1).join(' '),
    commentToCommand: fullMessage.slice(2).join(' ')
  }
}

const addTransaction = (username, value, comment) => {
  db.run(
    "INSERT INTO transactions (username, amount, comment) VALUES (?, ?, ?)",
    username, value, comment
  )
}

const replyBalance = (ctx, username) => {
  db.get("SELECT SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) AS income, " +
    "SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END) AS expense  " +
    "FROM transactions WHERE username = ?", username, (err, row) => {
    console.log(row,err)
    ctx.reply("Доход: " + row.income + " Расход: " + row.expense)
  })

}

const replyHistory = (ctx) => {
  const username = ctx.message.from.username
  db.all(
    'SELECT amount, comment FROM transactions WHERE username = ? ORDER BY id', username, (err, rows) => {
      console.log(err, rows)
      let replyHistoryWithComments = rows.map((transaction) => {
        if (transaction.comment === '') {
          return transaction.amount
        }
        return transaction.amount + ' - ' + transaction.comment
      })
      ctx.reply('История доходов и расходов:\n\n' + replyHistoryWithComments.join("\n"))
    }
  )

}

const addIncome = (ctx, value, comment) => {
  console.log("Увеличить доход", value)
  const username = ctx.message.from.username
  if (value) {
    addTransaction(username, value, comment)
    replyBalance(ctx, username)
  } else {
    ctx.reply("Вы ввели неправильное значение! Я понимаю только числа со знаком плюс или минус в начале!")
  }
}

const addExpense = (ctx, value, comment) => {
  console.log("Увеличить расход", value)
  const username = ctx.message.from.username
  if (value) {
    addTransaction(username, value*(-1), comment)
    replyBalance(ctx, username)
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
