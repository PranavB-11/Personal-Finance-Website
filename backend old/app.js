const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/login', (req, res) => {
    console.log("Received data [login] ...")
    console.log(req.body)
    res.send(req.body)
})

app.post('/signup', (req, res) => {
    console.log("Received data [signup] ...")
    console.log(req.body)
    res.send(req.body)
})

app.listen(port, () => {
    console.log(`Listening at localhost:${port}/`)
})