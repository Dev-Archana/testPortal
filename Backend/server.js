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

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Change as per your DB
    password: "admin", // Change as per your DB
    database: "mydatabase",
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

// **Register User**
app.post("/register", async (req, res) => {
    const { usn, college, email, fullname, createPassword } = req.body;

    if (!createPassword) {
        return res.status(400).json({ error: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(createPassword, 10);

    const query = "INSERT INTO users (usn, college, email, fullname, password) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [usn, college, email, fullname, hashedPassword], (err, result) => {
        if (err) {
            res.status(500).json({ error: "Error inserting user" });
        } else {
            res.status(201).json({ message: "Registration successful" });
        }
    });
});

// **Login User**
app.post("/login", async (req, res) => {
    const { usn, password } = req.body;

    db.query("SELECT * FROM users WHERE usn = ?", [usn], async (err, result) => {
        if (err || result.length === 0) {
            res.status(401).json({ error: "User not found" });
        } else {
            const user = result[0];
            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                res.status(401).json({ error: "Invalid password" });
            } else {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
                res.status(200).json({ message: "Login successful", token });
            }
        }
    });
});

// **Start Server**
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});