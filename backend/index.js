const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Connect DB
const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ connection established");
  } catch (err) {
    console.log("❌ not connected:", err.message);
  }
};

const app = express();
app.use(cors());
app.use(express.json());
connectdb();

// User Schema
const UserSchema = new Schema({
  username: { type: String, required: true, minlength: 4, unique: true },
  password: { type: String, required: true }
});
const UserModel = model('User', UserSchema);

// Register route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.create({ username, password });
    res.json({ message: "✅ User registered successfully", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "❌ User not found" });
    }
    if (user.password !== password) {
      return res.status(400).json({ error: "❌ Invalid password" });
    }
    res.json({ message: "✅ Login successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(4000, () => {
  console.log('🚀 server started on port 4000');
});
