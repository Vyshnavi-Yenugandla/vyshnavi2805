const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()

// Middleware
app.use(express.json())
app.use(cors())
app.use(express.static(__dirname))

// Import routers
const userRouter = require('./router/user.js')
const appointRouter = require('./router/appoint.js')
const dashRouter = require('./router/dash.js')
const paymentRouter = require('./router/payment.js')

// Import and connect to MongoDB
const connection = require('./mongodb.js')
connection()

// API Routes
app.use('/user', userRouter)
app.use('/appointment', appointRouter)
app.use('/dashbo', dashRouter)
app.use('/payment', paymentRouter)

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'start.html'))
})

app.listen(3001, () => {
    console.log('Smart Health System running on port 3001 with full API')
})