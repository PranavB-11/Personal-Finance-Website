const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const { JsonDB, Config } = require('node-json-db')

// Setup express app
const app = express()
app.use(cors())
const jsonParser = bodyParser.json()
const port = 3000

// Setup database
var db = new JsonDB(new Config("myDataBase", true, true, '/'));

// Authenticate user information
const authenticate = async (username, password) => {
    try {
        const test_password = await db.getData(`/${username}/password`)
        return password === test_password
    } catch(error) {
        return false;
    }
}

const success_status = {success: true}
const fail_status = {success: false}

// Source: https://dev.to/oyetoket/fastest-way-to-generate-random-strings-in-javascript-2k5a
const generateRandomString = function (length, randomString="") {
    randomString += Math.random().toString(20).substring(2, length);
    if (randomString.length > length) return randomString.slice(0, length);
    return generateRandomString(length, randomString);
};

app.post('/signup', jsonParser, async (req, res) => {
    const { username, password } = req.body

    // Data
    const key = `/${username}`
    const value = {
        password,
        "sections": {},
    }

    // Check username is unique
    try {
        await db.getData(key)
        return res.json(fail_status)
    } catch(error) {
        // Do nothing
    }

    // Add to database
    try {
        await db.push(key, value)
        return res.json(success_status)
    } catch(error) {
        return res.json(fail_status)
    }    
})

app.post('/login', jsonParser, async (req, res) => {
    const { username, password } = req.body
    const success = await authenticate(username, password)

    if (success) {
        return res.json(success_status)
    } else {
        return res.json(fail_status)
    }
})

app.post('/data', jsonParser, async (req, res) => {
    const { username, password } = req.body

    // Authenticate user
    const success = await authenticate(username, password)
    if (!success) {
        return res.json(fail_status)
    }

    // Get details from database
    const key = `/${username}`
    try {
        const value = await db.getData(key)
        value['success'] = true
        return res.json(value)
    } catch (error) {
        return res.json(fail_status)
    }
})

app.post('/section', jsonParser, async (req, res) => {
    const { username, password, section, budget, frequency, startDate, description } = req.body
    const purchases = {}

    // Authenticate user
    const success = await authenticate(username, password)
    if (!success) {
        return res.json(fail_status)
    }
    
    // Add details to database
    const key = `/${username}/sections/${section}`
    const value = { budget, frequency, startDate, description, purchases }
    try {
        await db.push(key, value)
        return res.json(success_status)
    } catch (error) {
        return res.json(fail_status)
    }
})

app.delete('/section', jsonParser, async (req, res) => {
    const { username, password, section } = req.body

    // Authenticate user
    const success = await authenticate(username, password)
    if (!success) {
        return res.json(fail_status)
    }
    
    // Remove details from database
    const key = `/${username}/sections/${section}`
    try {
        await db.delete(key)
        return res.json(success_status)
    } catch (error) {
        return res.json(fail_status)
    }
})

app.post('/purchase', jsonParser, async (req, res) => {
    const { username, password, section, name, cost, date } = req.body
    
    // Authenticate user
    const success = await authenticate(username, password)
    if (!success) {
        return res.json(fail_status)
    }

    // Add details to database
    const purchaseKey = generateRandomString(32)
    const key = `/${username}/sections/${section}/purchases/${purchaseKey}`
    const value = { name, cost, date }
    try {
        await db.push(key, value)
        return res.json(success_status)
    } catch (error) {
        return res.json(fail_status)
    }
})

app.delete('/purchase', jsonParser, async (req, res) => {
    const { username, password, section, purchaseKey } = req.body
    
    // Authenticate user
    const success = await authenticate(username, password)
    if (!success) {
        return res.json(fail_status)
    }

    // Delete details from database
    const sectionKey = generateRandomString(32)
    const key = `/${username}/sections/${section}/purchases/${purchaseKey}`
    try {
        await db.delete(key)
        return res.json(success_status)
    } catch (error) {
        return res.json(fail_status)
    }
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
