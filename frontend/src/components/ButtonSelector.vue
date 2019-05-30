<template>
    <div>
        <button
                v-for="choice in choices"
                v-on:click="select(choice)"
                :class="{selected: choice === selected}"
        >{{ choice }}</button>
    </div>
</template>

<script>
  export default {
    name: 'ButtonSelector',
    props: ['selected', 'choices'],
    methods: {
      select: function (choice) {
        if (choice === this.selected) {
          this.$emit('select', null)
        } else {
          this.$emit('select', choice)
        }
      }
    }
  }
</script>

<style scoped>
    .selected {
        background-color: cornflowerblue;
    }
</style>