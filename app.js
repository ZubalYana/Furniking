const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000;
const path = require('path')
const mongoose = require('mongoose')
const Goods = require('./models/Goods')
mongoose.connect(`mongodb+srv://zubalana0:${process.env.password}@cluster0.a50jr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>{
    console.log(`Connected to MongoDB`)
})
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req,res)=>{
    res.sendFile(__dirname, 'public', 'index.html')
})
app.listen(PORT, (()=>{
    console.log(`Server works on PORT: ${PORT}`)
}))