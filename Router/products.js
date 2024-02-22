// All dependencies

const express=require('express');
const multer=require('multer')
const path=require('path')


const imageUpload = require("../Middleware/upload")
const Category = require('../Models/category');
const Products = require("../Models/products");

products=express.Router()
products.use(express.json())
products.use(express.urlencoded())


// Find user data
products.get('/',(req,res)=>{
    Products.find({},(err,result)=>{
        if(err) throw err
        else
        {
            if(result.length ==  0)
            {
                res.status(401).json({
                    status:401,
                    message:"Products Data Not Found"
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

// Product ADD
products.post('/',async(req,res)=>{
    const category=await Category.findById(req.body.category);
    if(!category) 
    return res.status(400).json({
        status : 400 ,
        message:"Invalid Category"
    })

    let product=new Products({
        name:req.body.name,
        description:req.body.description,
        richDescription:req.body.richDescription,
        image:"image",
        images:"images",
        brand:req.body.brand,
        price:req.body.price,
        category:req.body.category,
        countinStock:req.body.countinStock,
        rating:req.body.rating,
        isFeatured:req.body.isFeatured,
        dateCreted:req.body.dateCreted,
    })
    product=await product.save()
    if(!product) 
    return res.status(400).json({
        status : 400 ,
        message:"The product cannot be created"
    })
    res.status(200).json({
        status:200,
        Data:product
    })
})


// Product Image Upload
products.post(
    '/uploadImage',
    imageUpload.single('image'),
    (req,res)=>{
        res.send(req.file)
    },
    (error,req,res,next)=>{
        res.status(400).send({error:error.message})
    }
)



    // Products.create(product,(err,result)=>{
    //     if(err) throw err
    //     else{
    //     console.log(result);
    //     }
    // })


    // const result=Products.insertMany(req.body,(err,resul)=>{
    //     if(err) throw err
    //     else{
    //         res.json({msg:"Insert data successfull"})
    //         console.log(resul);
    //     }
    // })

//     product.put('/',(req,res)=>{
//       Products.updateOne(
//         {name:req.body.name},{$set:{price:req.body.price}},
//         (err,result)=>{
//             if(err) throw err
//             else{
//                 res.send(result)
//                 console.log(result);
//             }
//         })
// })


// Product Update By ID
products.put('/:id',async(req,res)=>{
        const productid=await Products.findByIdAndUpdate(
            req.params.id,
            {
                price:req.body.price
            }
        )
        if(!productid) 
        return res.status(500).json({
            status:500,
            message:"Product not Founded"
         })
        else
        {
            res.status(200).json({
                status:200,
                "Sucessfully Modified Product":productid
            })
        }
    })


module.exports=products