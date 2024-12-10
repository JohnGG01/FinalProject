const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
});

module.exports = mongoose.model('Reservation', reservationSchema);