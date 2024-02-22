const multer = require("multer")

const imageStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./images')
   },
   filename:function(req,file,cb){
        cb(null,file.originalname)
   }
})

const imageUpload=multer({
    storage:imageStorage
})

module.exports=imageUpload;