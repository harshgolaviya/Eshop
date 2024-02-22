// All dependencies

const express=require('express')
const path=require('path');
const { error } = require('console');

const Category = require("../Models/category");
const imageUpload = require("../Middleware/upload")
category=express.Router()


category.use(express.json())
category.use(express.urlencoded())



// Find Category data
category.get('/',(req,res)=>{
    Category.find({},(err,result)=>{
        if(err) throw err
        else
        {
            if(result.length ==  0)
            {
                res.status(401).json({
                    status:401,
                    message:"Category Data Not Found"
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

// Find Category By id
category.get('/:id',async(req,res)=>{
    const Category_find=await Category.findById(req.params.id)
    if(!Category_find) return res.status(401).json({
             status:401,
             message:"Category Data Not Found"
    })
    res.status(200).json({
        status:200,
        Data:Category_find
    })
})


// category.post('/',(req,res)=>{
//     const result=Category.insertMany(req.body,(err,resul)=>{
//         if(err) throw err
//         else
//         {   
//             res.json({msg:"Insert data successfull"})
//             console.log(resul);
//         }
//     })
// })


// Category Insert
category.post("/",async(req,res)=>{
    let cate=new Category({
        id:req.body.id,
        name:req.body.name,
        icon:req.body.icon,
        color:req.body.color,
        image:req.body.image,
    })
    const Cate_insert=await cate.save()
    if(!Cate_insert) return res.status(500).json({
        status:401,
        message:"Category Not Insert"
    })
    res.status(200).json({
        status:200,
        Data:Cate_insert
    })

})


// Upload Image
category.post(
    '/uploadImage',
    imageUpload.single('image'),
    (req,res)=>{
        res.status(200).send(req.file)
    },
    (error,req,res,next)=>{
        res.status(400).send({error:error.message})
    }
)

// category.put('/',(req,res)=>{
//       Category.updateOne(
//         {name:req.body.name},{$set:{icon:req.body.icon}},
//         (err,result)=>{
//             if(err) throw err
//             else{
//                 res.send(result)
//                 console.log(result);
//             }
//         })
// })


// FindByID and Update Category Data
category.put('/:id',async(req,res)=>{
    const cate=await Category.findByIdAndUpdate(
        req.params.id,{
            name:req.body.name,
            icon:req.body.icon,
            color:req.body.color,
        })
        if(!cate) 
        return res.status(500).json({
            status:500,
            message:"Category not Founded"
         })
        else
        {
            res.status(200).json({
                status:200,
                "Sucessfully Deleted":cate
            })
        }
})



// category.delete('/',(req,res)=>{
//     Category.deleteOne({name:req.body.name},
//         (err,result)=>{
//             if(err) throw err
//             else{
//                 res.send(result)
//             }
//         })
// })


// FindByID and Delete Category Data
category.delete('/:id',async(req,res)=>{
    const cate=await Category.findByIdAndRemove(req.params.id)
    if(!cate) 
     return res.status(500).json({
         status:500,
         message:"Data Not Deleted"
      })
     else
     {
         res.status(200).json({
             status:200,
             "Sucessfully Deleted":cate
         })
     }
})

//Promise
// category.delete('/:id',async(req,res)=>{
//     const cate=await Category.findByIdAndRemove(req.params.id)
//     .then((cate)=>{
//         if(cate){
//             return res
//                 .status(200)
//                 .json({Success:"Successfull"})
//         }else{
//             return res
//                 .status(404)
//                 .json({Fail:"fail"})
//         }
//     })
//     .catch((err)=>{
//         return res.status(500).json({Fail:"Error"})
//     })
// })

module.exports=category