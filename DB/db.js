const  mongoose  = require('mongoose')

mongoose.pluralize(null);
mongoose.set('strictQuery',false)



module.exports = mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true})
.then(()=>{console.log('Database Is connected')})
.catch((err)=>{console.log(err)})
