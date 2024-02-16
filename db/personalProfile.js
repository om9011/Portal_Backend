const mongoose = require("mongoose");
const personalProfileSchema = mongoose.Schema({
 
  age: {
    type: Number,
    
    
  },
  dateOfBirth: {
    type: String ,
    
  },
  grade: {
    type: String,
    
  },
  contact: {
    type: String,
    
  },
  bloodGroup: {
    type: String,
    
  },
  
});

const PersonalProfile = mongoose.model(
  "PersonalProfile",
  personalProfileSchema
);
module.exports = PersonalProfile;
