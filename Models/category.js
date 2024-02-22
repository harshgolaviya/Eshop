const  mongoose = require("mongoose");


const categoryschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    icon:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
})


categoryschema.virtual("id").get(function(){
    return this._id.toHexString();
})
categoryschema.set("toJSON",{
    virtuals:true,
})

const Category=mongoose.model('Category',categoryschema)
module.exports=Category