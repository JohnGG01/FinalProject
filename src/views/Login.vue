<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <input v-model="username" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'LoginView', // Updated to follow the multi-word naming convention
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:5000/login', {
            username: this.username,
            password: this.password,
          });
          localStorage.setItem('token', response.data.token); // Save JWT token
          this.$router.push('/dashboard'); // Redirect to dashboard
        } catch (err) {
          alert('Login failed: ' + (err.response?.data || err.message));
        }
      },
    },
  };
  </script>