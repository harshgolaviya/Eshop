const  mongoose = require("mongoose");

const orderschema=new mongoose.Schema({
    orderitems:
            [{
                type:mongoose.Schema.Types.ObjectId,
                ref:'OrderItems',
                required:true
            }],
    shippingAddress1:{
        type:String,
        required:true
    },
    shippingAddress2:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    zip:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"Pending"
    },
    totalPrice:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Users'
    },
    dateOrdered:{
        type:Date,
        default:Date.now(),
        required:true
    },
})


orderschema.virtual("id").get(function(){
    return this._id.toHexString();
})
orderschema.set("toJSON",{
    virtuals:true,
})
const Orders=mongoose.model('Orders',orderschema)
module.exports=Orders


/*
{
    "orderitems":[
        {
            "quantity":3,
            "product":"63ca879dd7bdec0826ca45c9"
        },
        {
             "quantity":3,
            "product":"63ca93c6f5206fe20e712e23"
        }
    ],
    "shippingAddress1":"surat",
    "shippingAddress2":"surat",
    "city":"surat",
    "zip":"395006",
    "country":"India",
    "phone":6355533719,
    "user":"63cfbdbc6c4da444115ce09f"
}
*/