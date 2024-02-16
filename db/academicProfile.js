const mongoose = require("mongoose");
const academicProfileSchema = mongoose.Schema({
  schoolName: {
    type: String,
    
  },
  schoolAddress: {
    type: String,
    
  },
  classTeacher: {
    type: String,
    
  },
  medium: {
    type: String,
    enum: ["English", "Marathi", "Semi"],
    
  },
});

const AcademicProfile = mongoose.model(
  "AcademicProfile",
  academicProfileSchema
);
module.exports = AcademicProfile;
