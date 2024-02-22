
// All dependencies
const express=require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
require('dotenv/config')

const Users = require('../Models/users')
users=express.Router()


// Find user data
users.get('/',(req,res)=>{
    Users.find({},(err,result)=>{
        if(err) throw err
        else
        {
            if(result.length ==  0)
            {
                res.status(401).json({
                    status:401,
                    message:"User Data Not Found"
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

// Find User By id
users.get('/:id',async(req,res)=>{
    const User_in=await Users.findById(req.params.id)
    if(!User_in) return res.status(401).json({
             status:401,
             message:"User Data Not Found"
    })
    res.status(200).json({
        status:200,
        Data:User_in
    })
})

// users.post('/',(req,res)=>{
//     const result=Users.insertMany(req.body,(err,resul)=>{
//         if(err) throw err
//         else{
            // res.status(200).json({
            //     status:200,
            //     msg:"Insert data successfull"
            // })
//             console.log(resul);
//         }
//     })
// })


// Register User
users.post('/',async(req,res)=>{
    const user=new Users({
         name:req.body.name,
         email:req.body.email,
         passwordHash:bcrypt.hashSync(req.body.passwordHash,10),
         street:req.body.street,
         apartment:req.body.apartment,
         city:req.body.city,
         zip:req.body.zip,
         country:req.body.country,
         phone:req.body.phone,
         isAdmin:req.body.isAdmin
    }) 
    const user_in=await user.save()
    if(!user_in) return res.status(500).json({
        status:401,
        message:"User Not Insert"
    })
    res.status(200).json({
        status:200,
        Data:user_in
    })
})

// Login User And generate token
users.post('/login',async(req,res)=>{
    const user=await Users.findOne({email:req.body.email})
    const secret=process.env.secret;
    if(!user)
    {
        return res.status(404).json({
            status:404,
            message:"Email Not Founded"
         })
    }
    if(user && bcrypt.compareSync(req.body.password,user.passwordHash))
    {
        const token=jwt.sign(
            {
                username:user.name,
                isAdmin:user.isAdmin,
            },
            "skillqode",
            {expiresIn:"1d"}
        )
        res.status(200).json({
            status:200,
            User:user.email,
            Token:token
        })
    }
     else
    {
        res.status(404).json({
            status:404,
            message:"Password is wrong!"
         })
    }
})



// FindByID and Update User Data
users.put('/:id',async(req,res)=>{
    const user=await Users.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name,
            email:req.body.email,
        })
        if(!user) 
        return res.status(500).json({
            status:500,
            message:"User not Founded"
         })
        else
        {
            res.status(200).json({
                status:200,
                "Sucessfully Modified":user
            })
        }
})


// FindByID and Delete User Data
users.delete('/:id',async(req,res)=>{
     const user=await Users.findByIdAndRemove(req.params.id)
     if(!user) 
     return res.status(500).json({
         status:500,
         message:"Data Not Deleted"
      })
     else
     {
         res.status(200).json({
             status:200,
             "Sucessfully Deleted":user
         })
     }
})


module.exports=users