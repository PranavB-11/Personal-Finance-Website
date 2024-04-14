// Server.js in your backend directory
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

let entries = []; // This will store the entries in memory

app.post('/entries', (req, res) => {
    console.log("Received entry data:", req.body);  // Log incoming data
    const { sectionName, budget, startDate, frequency } = req.body;
    if (!sectionName || budget === undefined || !startDate || frequency === undefined) {
        return res.status(400).send({ message: "All fields are required and must be correctly formatted" });
    }
    // Add further data type checks here if necessary
    const newEntry = { sectionName, budget, startDate, frequency };
    entries.push(newEntry);
    res.status(201).send({ message: "Entry added successfully", data: newEntry });
});



// Route to confirm the server is running
app.get('/', (req, res) => {
    res.send('Backend server is running and ready to receive requests!');
});

app.get('/entries', (req, res) => {
    res.status(200).json(entries);
});

const PORT = 2525;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
