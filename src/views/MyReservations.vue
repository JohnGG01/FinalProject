<template>
    <div>
      <h1>My Reservations</h1>
      <ul>
        <li v-for="reservation in reservations" :key="reservation._id">
          <p><strong>Restaurant:</strong> {{ reservation.restaurantId?.name || 'Unknown' }}</p>
          <p><strong>Location:</strong> {{ reservation.restaurantId?.location || 'Unknown' }}</p>
          <p><strong>Date:</strong> {{ reservation.date }}</p>
          <p><strong>Time:</strong> {{ reservation.time }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'MyReservationsView',
    data() {
      return {
        reservations: [], // List of user reservations
      };
    },
    async mounted() {
      // Fetch reservations for the logged-in user
      try {
        const token = localStorage.getItem('token'); // Get the user's token
        const userId = JSON.parse(atob(token.split('.')[1])).id; // Decode the user ID from the JWT token
        const response = await axios.get(`http://localhost:5000/reservations/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }, // Pass the token for authentication
        });
        this.reservations = response.data; // Save reservations in local data
      } catch (err) {
        alert('Error fetching reservations: ' + err.message);
      }
    },
  };
  </script>