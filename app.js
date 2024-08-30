//connections
const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000;
const path = require('path')
const mongoose = require('mongoose')
const Goods = require('./models/Goods');
const multer = require('multer')
mongoose.connect(`mongodb+srv://zubalana0:${process.env.password}@cluster0.a50jr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>{
    console.log(`Connected to MongoDB`)
})
app.use(express.static(path.join(__dirname, 'public')))

//multer
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

//homepage endpoint
app.get('/', (req,res)=>{
    res.sendFile(__dirname, 'public', 'index.html')
})

//goods creation
app.post('/createGoods', upload.single('img'), async (req, res) => {
    try {
        const { type, title, status, rating, prices } = req.body;
        const imgPath = req.file ? req.file.path : null;

        if (!imgPath) {
            return res.status(400).json({ error: 'Image upload failed' });
        }

        let parsedPrices;
        try {
            parsedPrices = JSON.parse(prices);
        } catch (e) {
            return res.status(400).json({ error: 'Invalid prices format' });
        }
        const parsedRating = parseFloat(rating);
        if (isNaN(parsedRating)) {
            return res.status(400).json({ error: 'Invalid rating value' });
        }
        const newGoods = new Goods({
            img: imgPath,
            type,
            title,
            status,
            rating: parsedRating, 
            prices: parsedPrices
        });
        await newGoods.save();
        res.status(201).json(newGoods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



//PORT listening
app.listen(PORT, (()=>{
    console.log(`Server works on PORT: ${PORT}`)
}))