<template>
    <form v-on:submit.prevent="login" class="login">
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
          response.json().then(() => {
            console.log('Логин с паролем верны')
            this.$user.setup(this.username, this.key)
          })
        } ).catch(() => {
          alert('Неправильный логин или пароль')
        })
      }
    }
  }
</script>

<style scoped>
    .login {
        margin-top: 40px;
        width: 100%;
    }
    .login label {
        display: block;
        width: 100%;
        margin-top: 16px;
    }
    .login label input{
        display: block;
        width: 100%;
        margin-bottom: 32px;
    }
    .login button{
        display: block;
        width: 100%;
    }
</style>