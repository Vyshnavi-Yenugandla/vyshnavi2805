const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(__dirname))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'start.html'))
})

app.listen(3000, () => {
    console.log('Smart Health System running on port 3000')
})