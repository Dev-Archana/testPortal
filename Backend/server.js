const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json()); // ✅ Corrected request body parsing

// ✅ Improved MySQL Connection Handling
const db = mysql.createPool({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Database connection failed:", err.message);
    } else {
        console.log("✅ Connected to MySQL database");
        connection.release();
    }
});

// ✅ Registration Endpoint - Corrected Field Names & Debugging
app.post("/register", async (req, res) => {
    const { usn, college, email, fullname, createPassword, confirmPassword } = req.body;

    console.log("📥 Received Registration Data:", req.body); // Debugging

    if (!usn || !college || !email || !fullname || !createPassword || !confirmPassword) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (createPassword !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
        const hashedPassword = await bcrypt.hash(createPassword, 10);

        db.query(
            "INSERT INTO users (usn, college, email, fullname, password) VALUES (?, ?, ?, ?, ?)",
            [usn, college, email, fullname, hashedPassword],
            (err, result) => {
                if (err) {
                    console.error("❌ Error inserting user:", err);
                    return res.status(500).json({ error: "Registration failed" });
                }
                res.status(201).json({ message: "✅ Registration successful" });
            }
        );
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Login Endpoint - Improved Error Handling
app.post("/login", async (req, res) => {
    const { usn, password } = req.body;

    console.log("📥 Received Login Data:", req.body); // Debugging

    if (!usn || !password) {
        return res.status(400).json({ error: "USN and password required" });
    }

    db.query("SELECT * FROM users WHERE usn = ?", [usn], async (err, result) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign({ usn: user.usn }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "✅ Login successful", token });
    });
});

// ✅ Start Server
const server = app.listen(5000, () => {
    console.log("🚀 Server running on port 5000");
});

// ✅ Export for Testing
module.exports = { app, server, db };