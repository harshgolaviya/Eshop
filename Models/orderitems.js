const mongoose = require("mongoose");

const orderitemschema = new mongoose.Schema({
    quantity: { 
        type: Number,
        require: true
    },
    product: {  
        type: mongoose.Schema.Types.ObjectId,
        ref:"Products"
    },
});


    orderitemschema.virtual("id").get(function(){
        return this._id.toHexString();
    })
    orderitemschema.set("toJSON",{
        virtuals:true,
    })

const OrderItems = mongoose.model("OrderItems",orderitemschema);
module.exports = OrderItems;