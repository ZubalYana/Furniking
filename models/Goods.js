const mongoose = require('mongoose')

const goodsSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    prices: {
        type: Array,
        required: true
    },
})

const Goods = mongoose.model('Goods', goodsSchema)
module.exports = Goods