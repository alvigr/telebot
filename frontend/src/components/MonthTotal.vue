<template>
    <div>
        <p>Total income: {{ income }}</p>
        <p>Total expense: {{ expense }}</p>
        <p>Number of expensive purchases: {{ expensivePurchases }}</p>
    </div>
</template>

<script>
    const MIN_EXPENSIVE_PURCHASE = 500
  export default {
    name: 'MonthTotal',
    props: ['transactions'],
    computed: {
      income: function () {
        return this.transactions
        .filter(trans => trans.amount > 0)
        .reduce((sum, trans) => sum + trans.amount, 0)
      },
      expense: function () {
        return Math.abs(this.transactions
        .filter(trans => trans.amount < 0)
        .reduce((sum, trans) => sum + trans.amount, 0))
      },
      expensivePurchases: function () {
        return this.transactions
        .filter(trans => trans.amount < MIN_EXPENSIVE_PURCHASE * (-1))
          .length
      }
    }
  }
</script>

<style scoped>

</style>