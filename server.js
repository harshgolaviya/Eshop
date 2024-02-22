
// All dependencies
const express=require('express')
const morgan = require('morgan')
const cors=require('cors')
require('dotenv/config')


// All  routes 
const Database =require('./DB/db')
const authJwt=require('./Middleware/jwt')
const error=require('./Middleware/error-handler')
const category=require('./Router/category')
const products=require('./Router/products')
const orders=require('./Router/order')
const orderitems=require('./Router/orderitems')
const users=require('./Router/users')


const app=express()


// All middlware are used
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.options("*",cors())
app.use(morgan("tiny"))
app.use(authJwt())
app.use(error)


// All Routes
app.use('/category',category)
app.use('/products',products)
app.use('/orders',orders)
app.use('/orderitems',orderitems)
app.use('/users',users)


const PORT=process.env.PORT

// Server listening
app.listen(PORT,()=>{
    console.log("Server listening ");
})
