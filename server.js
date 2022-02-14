const express = require('express')
const cors = require('cors')
const app = express()

const task_router = require('./routes/task_routes')
const tasklist_router = require('./routes/tasklist_routes')

const corsOption = {
    origin:'http://localhost:3000'
}

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors(corsOption))

// routes
app.use('/api/tasks',task_router)
app.use('/api/tasklist',tasklist_router)

// test route
app.get('/',(req,res)=>{
    res.status(200).send('Hello world')
})

// PORT
const PORT = process.env.PORT || 8080

// server
app.listen(PORT,()=>{
    console.log(`Server running on port: ${PORT}`)
})