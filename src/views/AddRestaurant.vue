<template>
    <div>
      <h1>Add a Restaurant</h1>
      <form @submit.prevent="addRestaurant">
        <input v-model="name" placeholder="Restaurant Name" />
        <input v-model="location" placeholder="Location" />
        <input v-model="cuisine" placeholder="Cuisine Type" />
        <input v-model="capacity" type="number" placeholder="Capacity" />
        <button type="submit">Add Restaurant</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'AddRestaurantView',
    data() {
      return {
        name: '',
        location: '',
        cuisine: '',
        capacity: 0,
      };
    },
    methods: {
      async addRestaurant() {
        try {
          const token = localStorage.getItem('token');
          await axios.post(
            'http://localhost:5000/restaurants',
            {
              name: this.name,
              location: this.location,
              cuisine: this.cuisine,
              capacity: this.capacity,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          alert('Restaurant added successfully!');
          this.$router.push('/dashboard');
        } catch (err) {
          alert('Error adding restaurant: ' + err.response?.data || err.message);
        }
      },
    },
  };
  </script>