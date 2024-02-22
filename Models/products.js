const  mongoose = require("mongoose");

const productschema=new mongoose.Schema({
 
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    richDescription:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    images:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
         required:true
    },
    countinStock:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    isFeatured:{
        type:Boolean,
        required:true
    },
    dateCreted:{
        type:Date,
       default:Date.now()
    },
})

productschema.virtual("id").get(function(){
    return this._id.toHexString();
})
productschema.set("toJSON",{
    virtuals:true,
})
const Products=mongoose.model('Products',productschema)
module.exports=Products