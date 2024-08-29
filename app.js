const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000;
const path = require('path')
const mongoose = require('mongoose')
const Goods = require('./models/Goods')
const multer = require('multer')
mongoose.connect(`mongodb+srv://zubalana0:${process.env.password}@cluster0.a50jr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>{
    console.log(`Connected to MongoDB`)
})
app.use(express.static(path.join(__dirname, 'public')))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

app.get('/', (req,res)=>{
    res.sendFile(__dirname, 'public', 'index.html')
})
app.post('/createGoods', async (req,res)=>{
    const { img, type, title, status, rating, prices } = req.body;
    const newGoods = new Goods({
        img,
        type,
        title,
        status,
        rating,
        prices
    });
    await newGoods.save();
    res.status(201).json(newGoods);
})
app.listen(PORT, (()=>{
    console.log(`Server works on PORT: ${PORT}`)
}))