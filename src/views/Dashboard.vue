
<template>
    <div>
      <h1>Welcome, {{ userName || 'Guest' }}!</h1>
      <h2>Available Restaurants</h2>
      <div v-if="isLoading">Loading...</div>
      <div v-else>
        <div v-if="restaurants.length === 0">
          No restaurants available at the moment.
        </div>
        <ul>
          <li v-for="restaurant in restaurants" :key="restaurant.id">
            {{ restaurant.name }} - {{ restaurant.location }}
            <input type="date" v-model="bookingDate" />
            <input type="time" v-model="bookingTime" />
            <button @click="bookReservation(restaurant.id)">Book</button>
          </li>
        </ul>
      </div>
      
      <h2>My Reservations</h2>
      <div v-if="isLoading">Loading...</div>
      <div v-else>
        <div v-if="reservations.length === 0">
          You have no reservations yet.
        </div>
        <ul>
          <li v-for="reservation in reservations" :key="reservation.id">
            {{ reservation.restaurant }} - {{ reservation.date }} at {{ reservation.time }}
            <button @click="cancelReservation(reservation.id)">Cancel</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "DashboardPage",
    data() {
  return {
    restaurants: [], // Stores the restaurant data
    reservations: [],
    reservationsCollection: [], // Placeholder for collection // Stores the reservation data
    userName: "", // User's name
    isLoading: false // Tracks whether data is loading
  };
},
    methods: {
      async fetchData() {
        this.isLoading = true;
        try {
          const response = await fetch('https://your-backend-url/api/dashboard', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}` // Send user's token for authentication
            }
          });
          const data = await response.json(); // Convert the server response to usable data
          this.restaurants = data.restaurants; // Save restaurants data
          this.reservations = data.reservations; // Save reservations data
          this.userName = data.userName || "Guest"; // Example: Fetch user name from API
        } catch (error) {
          console.error('Error fetching data:', error); // Handle errors
        } finally {
          this.isLoading = false;
        }
      },
      async bookReservation(restaurantId) {
        if (!this.bookingDate || !this.bookingTime) {
          alert("Please select a date and time.");
          return;
        }
        try {
          await fetch('https://your-backend-url/api/reservations', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              restaurantId,
              date: this.bookingDate,
              time: this.bookingTime
            })
          });
          alert('Reservation booked!');
          this.fetchData(); // Refresh the dashboard
        } catch (error) {
          console.error('Error booking reservation:', error);
        }
      },
      async cancelReservation(reservationId) {
        try {
          await fetch(`https://your-backend-url/api/reservations/${reservationId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          alert('Reservation canceled!');
          this.fetchData(); // Refresh the dashboard
        } catch (error) {
          console.error('Error canceling reservation:', error);
        }
      }
    },
    mounted() {
      this.fetchData(); // Fetch data when the component is loaded
    }
  };
  </script>
  
  <style>
  /* General Styling */
  h1, h2 {
    text-align: center;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin: 10px 0;
  }
  
  button {
    padding: 8px 12px;
    margin: 5px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  input {
    margin: 5px;
    padding: 5px;
  }
  </style>
  