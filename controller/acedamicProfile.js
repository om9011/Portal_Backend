const PersonalProfile = require("../db/personalProfile");
const academicProfile = require("../db/academicProfile");
const Profile = require("../db/profile");
const User = require("../db/user");
const FamilyProfile = require("../db/familyProfile");
const AcademicProfile = require("../db/academicProfile");

exports.updateAcedamicDetails = async (req, res) => {
  try {
    const { schoolName, schoolAddress, classTeacher, medium } = req.body;

    const id = req.user.id;
    console.log("BACKEND DATA AT AC PROFILE", id, req.body);
    if (!id || !schoolName || !schoolAddress || !classTeacher || !medium)
      return res
        .status(400)
        .json({ message: "Something missing at update Acedamics" });

    const user = await User.find({ id: id });
    const academicProfile = user[0].academicProfile;

    console.log(academicProfile);

    const result = await AcademicProfile.findByIdAndUpdate(
      { _id: academicProfile },
      {
        schoolName: schoolName,
        schoolAddress: schoolAddress,
        classTeacher: classTeacher,
        medium: medium,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Acedamic profile updated sucessfuly", result });
  } catch (e) {
    console.log("ERROR AR UPDATE ACEDAMICS:", e.message);
  }
};
