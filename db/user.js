const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Student", "Admin", "Operator"],
      required: true,
    },
    personalProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PersonalProfile",
      required: true,
    },
    familyProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FamilyProfile",
      required: true,
    },
    academicProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicProfile",
      required: true,
    },
    attendance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendance",
      required: true,
    },
    class:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
   
    profilePhto:{
      type:String
    },
  },
  {
    timestamps: true,
  }
);
// add profile in user schema
const User = mongoose.model("User", userSchema);
module.exports = User;
