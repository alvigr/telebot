<template>
    <div class="history">
        <h2>History</h2>
        <TypeFilter v-on:select="onSelectType" :selected-type="selectedType"></TypeFilter>
        <div v-for="[month, transactions] in groupedByMonths">
            <h4>{{ month }}</h4>
            <ul>
                <li v-for="transaction in transactions">
                    {{ transaction.amount }}
                    <span v-if="transaction.comment">({{ transaction.comment }})</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
  import TypeFilter from './TypeFilter'
  import moment from 'moment'

  export default {
    name: 'History',
    components: { TypeFilter },
    props: ['transactions'],
    data: function () {
      return {
        selectedType: 'All',
      }
    },
    computed: {
      expense: function () {
        return this.transactions.filter(trans => trans.amount < 0)
      },
      income: function () {
        return this.transactions.filter(trans => trans.amount > 0)
      },
      filteredTransactions: function () {
        if (this.selectedType === 'Income') {
          return this.income
        }
        if (this.selectedType === 'Expense') {
          return this.expense
        }
        return this.transactions
      },
      groupedByMonths: function () {
        const map = new Map()
        for (let transaction of this.filteredTransactions) {
          let month = moment(transaction.created).format('MMMM YYYY')
          if (!map.has(month)) {
            map.set(month, [])
          }
          map.get(month).push(transaction)
        }
        return map
      }
    },
    methods: {
      onSelectType: function (type) {
        this.selectedType = type
      }
    }
  }
</script>

<style scoped>

</style>