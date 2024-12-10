<template>
    <div>
      <h1>Sign Up</h1>
      <form @submit.prevent="register">
        <input v-model="username" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'RegisterView',
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      async register() {
        try {
          await axios.post('http://localhost:5000/register', {
            username: this.username,
            password: this.password,
          });
          alert('Registration successful!');
          this.$router.push('/login');
        } catch (err) {
          alert('Error registering: ' + (err.response?.data || err.message));
        }
      },
    },
  };
  </script>