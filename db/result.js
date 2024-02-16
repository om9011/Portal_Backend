const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  result: [
    {
      subject: {
        type: String,
        
      },
      marks: {
        type: String,
        
      },
    },
  ],
  status: {
    type: String,
    
  },
});

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
