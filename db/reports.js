const mongoose = require("mongoose");

const reportsSchema=mongoose.Schema({

   monthName:{
        type: String,
        required: true,
    },
    file:{
        type: String,
        required: true,
    }
})

const report=mongoose.model("reports",reportsSchema);
module.exports=report;