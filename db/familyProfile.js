const { default: mongoose } = require("mongoose");
const moogoes = require("mongoose");

const familyProfileSchema = new moogoes.Schema({
  motherName: {
    type: String,
    
  },
  fatherName: {
    type: String,
    
  },
  contact: {
    type: String,
    
  },
  occupation: {
    type: String,
    
  },
  income: {
    type: String,
    
  },
  siblingCount: {
    type: Number,
    
  },
});

const FamilyProfile = mongoose.model("FamilyProfile", familyProfileSchema);
module.exports = FamilyProfile;
