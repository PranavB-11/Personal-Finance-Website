const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = "mongodb+srv://financeproj4222:xjRJrxekpej4qOeF@cluster4222.99uvzh7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster4222";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const EntrySchema = new mongoose.Schema({
    sectionName: String,
    budget: Number,
    startDate: Date,
    frequency: Number
});

const Entry = mongoose.model('Entry', EntrySchema);

app.post('/entries', async (req, res) => {
    try {
        const { sectionName, budget, startDate, frequency } = req.body;
        if (!sectionName || budget === undefined || !startDate || frequency === undefined) {
            return res.status(400).send({ message: "All fields are required and must be correctly formatted" });
        }
        
        const newEntry = new Entry({ sectionName, budget, startDate, frequency });
        await newEntry.save();
        res.status(201).send({ message: "Entry added successfully", data: newEntry });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send({ message: "Internal server error" });
    }
});

app.get('/entries', async (req, res) => {
    try {
        const entries = await Entry.find({});
        res.status(200).json(entries);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: "Internal server error" });
    }
});

const PORT = 2525;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
