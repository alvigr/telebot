<template>
    <form v-on:submit.prevent="login">
        <label>
            Username:
            <input type="text" name="username" v-model="username"/>
        </label>
        <label>
            Key:
            <input type="password" name="key" v-model="key"/>
        </label>
        <button type="submit">Login</button>
    </form>
</template>

<script>
  export default {
    name: 'Login',
    data: () => {
      return {
        username: '',
        key: ''
      }
    },
    methods: {
      login: function () {
        console.log(this.username, this.key)
        fetch('http://127.0.0.1:3000/transactions', {headers: {'Secret': this.username + ':' + this.key}}).then((response) => {
          response.json().then((data) => {
            console.log('Логин с паролем верны')
            this.$emit('login', {
              username: this.username,
              key: this.key
            })
          })
        } ).catch((error) => {
          alert('Неправильный логин или пароль')
        })
      }
    }
  }
</script>

<style scoped>

</style>