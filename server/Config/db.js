const mongoose =  require("mongoose");

mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("successfully connection to the db..."))
    .catch((err)=> console.log(err))