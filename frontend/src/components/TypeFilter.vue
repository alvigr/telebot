<template>
    <div>
        <button v-for="type in types" v-on:click="select(type)" v-bind:class="{ selected: isSelected(type) }">{{ type }}</button>
    </div>
</template>

<script>
  export default {
    name: 'TypeFilter',
    props: ['selectedType'],
    data: function () {
      return {
        types: ['All', 'Income', 'Expense']
      }
    },
    methods: {
      select: function (type) {
        this.$emit('select', type)
      },
      isSelected: function (type) {
        return type === this.selectedType
      }
    },
  }
</script>

<style scoped>
.selected {
    background-color: cornflowerblue;
}
</style>