const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const SALT_FACTOR = 10;


let appointmentSchema = new mongoose.Schema({
    userName: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: { type: String, required: true},
    service: {type: String, required: true},
    createdAt: { type: Date, default: Date.now },
   
});



module.exports = mongoose.model('Appointment', appointmentSchema);