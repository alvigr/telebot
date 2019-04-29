const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db.sqlite')

exports.addTransaction = (username, value, comment) => {
  db.run(
    "INSERT INTO transactions (username, amount, comment) VALUES (?, ?, ?)",
    username, value, comment
  )
}

exports.getBalance = (username, handler) => {
  db.get("SELECT SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) AS income, " +
    "SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END) AS expense  " +
    "FROM transactions WHERE username = ?", username, handler)
}

exports.history = (username, handler) => {
  db.all(
    'SELECT amount, comment FROM transactions WHERE username = ? ORDER BY id', username, handler)
}