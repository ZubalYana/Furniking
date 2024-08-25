const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000;
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req,res)=>{
    res.sendFile(__dirname, 'public', 'index.html')
})
app.listen(PORT, (()=>{
    console.log(`Server works on PORT: ${PORT}`)
}))