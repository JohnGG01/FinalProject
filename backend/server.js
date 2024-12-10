const express = require('express'); // Import Express
const bodyParser = require('body-parser'); // Import Body Parser
const cors = require('cors'); // Import CORS
const mongoose = require('mongoose'); // Import Mongoose
const jwt = require('jsonwebtoken'); // Import JSON Web Token
const bcrypt = require('bcryptjs'); // Import Bcrypt

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/restaurant', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Models
const User = require('./models/User');
const Restaurant = require('./models/Restaurant');
const Reservation = require('./models/Reservation'); // Import the Reservation model only once

// User Routes
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(400).send('Error registering user: ' + err.message);
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
        res.send({ token });
    } catch (err) {
        res.status(400).send('Error logging in: ' + err.message);
    }
});

// Restaurant Routes
app.post('/restaurants', async (req, res) => {
    try {
        const restaurant = new Restaurant(req.body);
        await restaurant.save();
        res.status(201).send(restaurant);
    } catch (err) {
        res.status(400).send('Error adding restaurant: ' + err.message);
    }
});

app.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.send(restaurants);
    } catch (err) {
        res.status(500).send('Error fetching restaurants: ' + err.message);
    }
});

// Reservation Routes
app.post('/reservations', async (req, res) => {
    try {
        const reservation = new Reservation(req.body); // Create a new reservation using the data sent by the user
        await reservation.save(); // Save the reservation to the database
        res.status(201).send(reservation); // Send the newly created reservation back to the client
    } catch (err) {
        res.status(400).send('Error making reservation: ' + err.message);
    }
});

app.get('/reservations/:userId', async (req, res) => {
    try {
        const reservations = await Reservation.find({ userId: req.params.userId }) // Find reservations by user ID
            .populate('restaurantId', 'name location'); // Populate the restaurant details
        res.send(reservations); // Send reservations to the client
    } catch (err) {
        res.status(500).send('Error fetching reservations: ' + err.message);
    }
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

async function seedRestaurants() {
    const sampleRestaurants = [
      { name: "The Gourmet Grill", location: "New York, NY", cuisine: "American", rating: 4.5 },
      { name: "Sushi Paradise", location: "San Francisco, CA", cuisine: "Japanese", rating: 4.8 },
      { name: "Pasta Heaven", location: "Los Angeles, CA", cuisine: "Italian", rating: 4.3 },
      { name: "Taco Fiesta", location: "Austin, TX", cuisine: "Mexican", rating: 4.6 },
      { name: "Curry Kingdom", location: "Chicago, IL", cuisine: "Indian", rating: 4.7 }
    ];
  
    try {
      const existingRestaurants = await restaurantsCollection.find({}).toArray();
      if (existingRestaurants.length === 0) {
        await restaurantsCollection.insertMany(sampleRestaurants);
        console.log("Sample restaurants added to the database!");
      } else {
        console.log("Restaurants already exist in the database, skipping seeding.");
      }
    } catch (err) {
      console.error("Error seeding restaurants:", err);
    }
  }
  
  seedRestaurants(); // Call this function when the server starts
  