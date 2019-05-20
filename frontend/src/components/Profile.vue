<template>
    <div>
        <h4>{{ user.username }}</h4>
        <button v-on:click="logout">Logout</button>
    </div>
</template>

<script>
  export default {
    name: 'Profile',
    props: ['user'],
    methods: {
      logout: function () {
        this.$emit('logout')
      }
    }
  }
</script>

<style scoped>

</style>