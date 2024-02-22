
// All dependencies

const express = require('express')
const { connection } = require('mongoose')


const OrderItems = require('../Models/orderitems')
const Orders = require("../Models/orders")

orders = express.Router()



// orders.get('/', (req, res) => {
//     Orders.find({}, (err, result) => {
//         if (err) throw err
//         else {
//             res.send(result)
//         }
//     })
// })

// Find User name
orders.get('/',async(req,res)=>{
    const orderlist=await Orders.find()
    .populate("user","name")
    .sort({dateOrdered:-1})
    if(!orderlist){
        res.status(500).json({Success:false})
    }
    res.status(200).json({
        status:200,
        Data:orderlist
     })
})


// Get user's orders by ID
orders.get('/:id',async(req,res)=>{
    const orderlist=await Orders.findById(req.params.id)
    .populate("user","name")
    .populate({
        path:"orderitems",
        populate:{
            path:"product",
            populate:"category"
        },
    })
    if(!orderlist){
        res.status(500).json({Success:false})
    }
    res.status(200).json({
        status:200,
        Data:orderlist
    })
})

// orders.post('/',(req,res)=>{
//     const result=Orders.insertMany(req.body,(err,resul)=>{
//         if(err) throw err
//         else{
//             res.json({msg:"Insert data successfull"})
//             console.log(resul);
//         }
//     })
// })


// Add Order Information
orders.post('/', async (req, res) => {
    const orderItemIds = Promise.all(
        req.body.orderitems.map(async (x) => {
            let newOrderItem = new OrderItems({
                quantity: x.quantity,
                product: x.product,
            })
            newOrderItem1 = await newOrderItem.save()
            console.log(newOrderItem1);
            return newOrderItem._id
        })
    )

    const orderItemsIdsResolved = await orderItemIds;
    const totalPrices = await Promise.all(
        orderItemsIdsResolved.map(async (x) => {
            const orderItem = await OrderItems.findById(x).populate(
                "product",
                "price",
            )
            const totalPrice = orderItem.product.price * orderItem.quantity
            return totalPrice
        })
    )

    const totalPrice = totalPrices.reduce((a, b) => a + b, 0)

        const order = new Orders({
            orderitems: orderItemsIdsResolved,
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2: req.body.shippingAddress2,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phone: req.body.phone,
            totalPrice: totalPrice,
            user: req.body.user,
        })
        const order_in = await order.save()
        if(!order_in) 
            return res.status(400).json({
            status : 400 ,
            message:"'Invalid information'"
        })
            res.status(200).json({
                status:200,
                Data:order
        })
})


// Order Delete by ID
orders.delete('/:id',async(req,res)=>{
    const id=await Orders.findByIdAndRemove(req.params.id)
    if(!id) 
    return res.status(500).json({
        status:500,
        message:"Id not founded..."
     })
    else
    {
        res.status(200).json({
            status:200,
            "Sucessfully Order Cancelled":id
        })
    }
})
module.exports = orders
