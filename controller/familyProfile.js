const PersonalProfile = require("../db/personalProfile");
const personalProfile = require("../db/personalProfile");
const FamilyProfile = require("../db/familyProfile");
const User = require("../db/user");

exports.updateFamilyProfile = async (req, res) => {
  try {
    const {
      motherName,
      fatherName,
      contact,
      occupation,
      income,
      siblingCount,
    } = req.body;

    const id = req.user.id;
    // validation
    if (
      !id ||
      !motherName ||
      !fatherName ||
      !contact ||
      !occupation ||
      !income ||
      !siblingCount
    ) {
      return res.status(400).json({
        message: "Something missing at updateFailmyProfile",
        sucess: false,
      });
    }
    const user = await User.find({ id: id });
    const familyProfileId = user[0].familyProfile;

    const result = await FamilyProfile.findByIdAndUpdate(
      { _id: familyProfileId },
      {
        motherName: motherName,
        fatherName: fatherName,
        contact: contact,
        occupation: occupation,
        income: income,
        siblingCount: siblingCount,
      }, // Update
      { new: true }
    );

    return res.status(200).json({ message: "Sucess", result });
  } catch (e) {
    console.log("ERROR AR UPDATE FAMILYPROFILE :", e.message);
  }
};
