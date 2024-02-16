const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  personalProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PersonalProfile",
  },
  familyProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FamilyProfile",
  },
  academicProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AcademicProfile",
  },
  
  attendance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attendance",
  },
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
