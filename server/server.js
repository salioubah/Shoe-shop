const express = require('express')
const app = express()
require('dotenv').config();
const shoeRoutes = require('./routes/shoe');

app.use(express.json())
app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

    next();
});
app.use('/api/v1', shoeRoutes);


app.listen(process.env.PORT, () => {
    console.log('App listening !!!')
})