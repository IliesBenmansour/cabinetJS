import express from "express";
import mysql from 'mysql2/promise'; // Use mysql2/promise for better promise support
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); // Add this line to parse JSON requests

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: "cabinet"
});

app.post('/tentativelogin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [data] = await db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password]);

        if (data.length > 0) {
            return res.json({ success: true, message: 'Login successful' });
        } else {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(5000, () => console.log("app is running"));
