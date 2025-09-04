const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const { Schema, model } = mongoose;

/* -------------------- DB Connection -------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection failed:", err.message));

const app = express();
app.use(cors());
app.use(express.json());

/* -------------------- User Schema -------------------- */
const UserSchema = new Schema({
  username: { type: String, required: true, minlength: 4, unique: true },
  password: { type: String, required: true },
});
const UserModel = model("User", UserSchema);

/* -------------------- Material Schema -------------------- */
const MaterialSchema = new Schema({
  type: { type: String, enum: ["theory", "practical", "previous"], required: true },
  year: { type: Number, required: true },
  semester: { type: Number, required: true },
  name: { type: String, required: true }, // subject name
  units: [
    {
      title: { type: String, required: true }, // e.g., Unit 1
      content: { type: String, required: true }, // link / description
    },
  ],
});
const MaterialModel = model("Material", MaterialSchema);

/* -------------------- Register -------------------- */
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.create({ username, password });
    res.json({ message: "✅ User registered successfully", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* -------------------- Login -------------------- */
app.post("/login", async (req, res) => {
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

/* -------------------- Admin: Add Material -------------------- */
app.post("/admin/material", async (req, res) => {
  const { type, year, semester, name, unitTitle, unitContent } = req.body;
  if (!type || !year || !semester || !name || !unitTitle || !unitContent) {
    return res.status(400).json({ error: "❌ All fields are required" });
  }

  try {
    let material = await MaterialModel.findOne({ type, year, semester, name });

    if (!material) {
      material = await MaterialModel.create({
        type,
        year,
        semester,
        name,
        units: [{ title: unitTitle, content: unitContent }],
      });
    } else {
      material.units.push({ title: unitTitle, content: unitContent });
      await material.save();
    }

    res.json({ message: "✅ Material saved successfully", material });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------- Get Materials (for students) -------------------- */
app.get("/materials/:type/:year/:semester", async (req, res) => {
  const { type, year, semester } = req.params;
  try {
    const materials = await MaterialModel.find({
      type,
      year: Number(year),
      semester: Number(semester),
    });
    res.json(materials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------- Admin: Get Materials -------------------- */
app.get("/admin/materials/:type/:year/:semester", async (req, res) => {
  const { type, year, semester } = req.params;
  try {
    const materials = await MaterialModel.find({
      type,
      year: Number(year),
      semester: Number(semester),
    });
    res.json(materials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------- Delete Subject -------------------- */
app.delete("/admin/material/:id", async (req, res) => {
  try {
    await MaterialModel.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Subject deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------- Delete Unit -------------------- */
app.delete("/admin/material/:id/unit/:unitIndex", async (req, res) => {
  try {
    const { id, unitIndex } = req.params;
    const material = await MaterialModel.findById(id);
    if (!material) return res.status(404).json({ error: "❌ Subject not found" });

    material.units.splice(unitIndex, 1);
    await material.save();

    res.json({ message: "✅ Unit deleted successfully", material });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------- Start Server -------------------- */
app.listen(4000, () => console.log("🚀 Server running on port 4000"));
