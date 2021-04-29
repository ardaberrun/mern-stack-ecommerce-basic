const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();



// MongoDB Connection
const connectDatabase = require('./database-connection');
connectDatabase();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares 
app.use(cors());
app.use(express.json());


const userRoute = require('./routes/user') 
const productRoute = require('./routes/product') 
const categoryRoute = require('./routes/category') 
const cartRoute = require('./routes/cart');
// Routes
app.use('/api',userRoute);
app.use('/api/cart',cartRoute);
app.use('/api/product',productRoute);
app.use('/api/category',categoryRoute);




app.get('/api', (req,res) => {
    res.json({server: 'ok'})
});



app.listen(PORT,() => {
    console.log(`server is running on ${PORT}`);
})




