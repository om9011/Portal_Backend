const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema({
  
  attendance: [
    {

      data:{
        type:String,
        required:true
      },
      profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
      },

      status:{
        type: String,
        enum: ["Present", "Absent"],
        required: true,
      }

    }
  ],
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
