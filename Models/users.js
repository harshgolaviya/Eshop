const  mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    email: { 
        type: String,
        required: true
    },
    passwordHash: { 
        type: String,
        required: true 
    },
    street: { 
        type: String,
        required: true 
    },
    apartment: {
         type: String,
        required: true
    },
    city: { 
        type: String,
        required: true 
    },
    zip: { 
        type: String,
        required: true 
    },
    country: { 
        type: String,
        required: true 
    },
    phone: { 
        type: Number,
        required: true 
    },
    isAdmin: { 
        type: Boolean,
        required: true 
    },
});


usersSchema.virtual("id").get(function(){
    return this._id.toHexString();
})
usersSchema.set("toJSON",{
    virtuals:true,
})

const Users=mongoose.model('Users',usersSchema)
module.exports=Users