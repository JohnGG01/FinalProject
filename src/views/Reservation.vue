<template>
    <div>
      <h1>Make a Reservation</h1>
      <form @submit.prevent="makeReservation">
        <label for="restaurant">Select a Restaurant:</label>
        <select v-model="restaurantId" id="restaurant">
          <option v-for="restaurant in restaurants" :key="restaurant._id" :value="restaurant._id">
            {{ restaurant.name }} - {{ restaurant.location }}
          </option>
        </select>
  
        <label for="date">Date:</label>
        <input v-model="date" type="date" id="date" />
  
        <label for="time">Time:</label>
        <input v-model="time" type="time" id="time" />
  
        <button type="submit">Reserve</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ReservationView',
    data() {
      return {
        restaurants: [], // List of restaurants
        restaurantId: '', // Selected restaurant ID
        date: '', // Selected date
        time: '', // Selected time
      };
    },
    async mounted() {
      // Fetch all restaurants to display in the dropdown
      try {
        const response = await axios.get('http://localhost:5000/restaurants');
        this.restaurants = response.data; // Save restaurants in local data
      } catch (err) {
        alert('Error fetching restaurants: ' + err.message);
      }
    },
    methods: {
      async makeReservation() {
        try {
          const token = localStorage.getItem('token'); // Get the user's token
          await axios.post(
            'http://localhost:5000/reservations',
            {
              restaurantId: this.restaurantId,
              date: this.date,
              time: this.time,
            },
            {
              headers: { Authorization: `Bearer ${token}` }, // Pass the token for authentication
            }
          );
          alert('Reservation made successfully!');
        } catch (err) {
          alert('Error making reservation: ' + err.message);
        }
      },
    },
  };
  </script>