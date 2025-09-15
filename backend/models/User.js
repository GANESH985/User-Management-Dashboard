// backend/models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // keep email unique
    match: [/\S+@\S+\.\S+/, "Valid email required"],
  },
  phone: {
    type: String,
    trim: true,
  },
  company: {
    type: String,
    trim: true,
  },
  address: {
    street: { type: String },
    city: { type: String },
    zip: { type: String },
    geo: {
      lat: { type: String },
      lng: { type: String },
    },
  },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
