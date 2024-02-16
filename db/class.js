const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  classsName: {
   type: String,
    required: true,
  },
  classTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  studentList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
 
  updateForClass:{
    type:String,
    required: true,
  },
  updateInFileFormate:{
    type:String,
    required: true,
      }
    ,
    dailyUpdate:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"dailyUpdate"
    }]
});
// make Profile ans User because we are making user as primary and inside that we add the prodile schma 
const Class = mongoose.model("Class", classSchema);
module.exports = Class;
