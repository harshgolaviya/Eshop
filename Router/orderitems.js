const express=require('express')

const OrderItems = require("../Models/orderitems");
const Products = require("../Models/products");
orderitems=express.Router()


// Find OrderItems 
orderitems.get('/',(req,res)=>{
    OrderItems.find({},(err,result)=>{
        if(err) throw err
        else
        {
            if(result.length ==  0)
            {
                res.status(401).json({
                    status:401,
                    message:"OrderItems Data Not Found"
                }) 
            }
            else
            {
                 res.status(200).json({
                         status:200,
                         Data:result
                 })
            }
        }
    })
})


//  Add OrderItems
orderitems.post('/',async(req,res)=>{

    const Productsid=await Products.findById(req.body.product);
    if(!Productsid) 
    return res.status(400).json({
        status : 400 ,
        message:"Invalid Product ID"
    })

    let orderitem=new OrderItems({
        quantity:req.body.quantity,
        product:req.body.product
    })
    orderitem=await orderitem.save()
    if(!orderitem) 
    return res.status(400).json({
        status : 400 ,
        message:"The OrderItems cannot be created"
    })
    res.status(200).json({
        status:200,
        Data:orderitem
    })
})

// cancelled ordeeritems
orderitems.delete('/:id',async(req,res)=>{
    const orderItemid=await OrderItems.findByIdAndUpdate(
        req.params.id,
        {
            price:req.body.price
        }
    )
    if(!orderItemid) 
    return res.status(500).json({
        status:500,
        message:"Id not founded.."
     })
    else
    {
        res.status(200).json({
            status:200,
            "Sucessfully Cancelled OrderItems":orderItemid
        })
    }
})


module.exports=orderitems