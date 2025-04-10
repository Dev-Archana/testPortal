const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Establish MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

// ✅ Define Routes

app.post("/register", async (req, res) => {
    const { usn, college, email, fullname, password } = req.body;

    if (!usn || !college || !email || !fullname || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        "INSERT INTO users (usn, college, email, fullname, password) VALUES (?, ?, ?, ?, ?)",
        [usn, college, email, fullname, hashedPassword],
        (err, result) => {
            if (err) {
                console.error("Error inserting user:", err);
                return res.status(500).json({ error: "Registration failed" });
            }
            res.status(201).json({ message: "Registration successful" });
        }
    );
});

app.post("/login", async (req, res) => {
    const { usn, password } = req.body;

    if (!usn || !password) {
        return res.status(400).json({ error: "USN and password required" });
    }

    db.query("SELECT * FROM users WHERE usn = ?", [usn], async (err, result) => {
        if (err || result.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign({ usn: user.usn }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login successful", token });
    });
});

// ✅ Start Server
const server = app.listen(5000, () => {
    console.log("Server running on port 5000");
});

// ✅ Export for Testing
module.exports = { app, server, db };