const User = require("../db/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const currentIndex = require("../db/currentINdex");
const Profile = require("../db/profile");
const FamilyProfile = require("../db/familyProfile");
const PersonalProfile = require("../db/personalProfile");
const academicProfile = require("../db/academicProfile");
const AcademicProfile = require("../db/academicProfile");
const Attendance = require("../db/attendance");
const Class = require("../db/class");
const requetsDB = require("../db/requestDB");

// signup
exports.signUp = async (req, res) => {
  try {
    const { id, firstName, lastName, contact, email, password, role, standard } = req.body;

    // validation of input
    if (!id || !firstName || !lastName || !contact || !email || !password || !standard) {
      return res.status(400).json({
        messsage: "Something is missing at signup",
        sucess: false,
      });
    }

    // find the index and current no of document in user schma
    const recordCount = await User.countDocuments();
    // printjson(index)

    // check if user already present
    const findUser = await User.find({ email: email });

    if (findUser.length > 0) {
      return res.status(400).json({
        messsage: "User already registerd",
        sucess: false,
      });
    }
    const useid = await User.find({ id: id });
    if (useid.length > 0) {
      return res.status(400).json({
        message: "User Roll No is already Present",
        sucess: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // create 4 schma and init with NULL
    const personalProfile = await PersonalProfile.create({
      age: null,
      dateOfBirth: null,
      grade: null,
      contact: null,
      bloodGroup: null,
    });
    const familyProfile = await FamilyProfile.create({
      motherName: null,
      fatherName: null,
      contact: null,
      occupation: null,
      income: null,
      siblingCount: null,
    });

    // by default marthi medium is added
    const academicProfile = await AcademicProfile.create({
      schoolName: null,
      schoolAddress: null,
      classTeacher: null,
      medium: "Marathi",
    });
    const attendence = await Attendance.create({
      profile: null,
      attendance: [null],
    });


    const result = await Class.findOne({ classsName: standard });
    console.log("result of class", result);
    console.log(result)
    if (!result)
      return res.status(404).json({
        message: "Class Not present"
      })
    // creating entry in DB
    const user = await User.create({
      id: id,
      firstName,
      lastName,
      contact,
      email,
      password: hashPassword,
      role: "Student",
      personalProfile,
      familyProfile,
      academicProfile,
      attendance: attendence,
      class: result._id
    });

    // console.log("RESULT OF CLASS ",result)
    console.log("User,", user._id + "")
    // if(result.length==0){
    //   return res.status(404).json({
    //     message:"Invalid class"
    //   })
    // }
    // // add the student in class
    result.studentList.push(user._id + "");
    await result.save();

    // console.log(user.email);
    // for Role
    if (role == "Operator" || role == "Admin") {
      const requestToAuth = await requetsDB.create({
        user: user._id,
        admin: null,
        status: "Pending",
        role,
      });
    }

    return res.status(200).json({
      message: "User signUp sucessfully",
      sucess: true,
      data: user,
      rollNo: recordCount + 1000,
    });
  } catch (e) {
    console.log("ERROR AT SIGNUP ", e.message);
  }
};

// login
exports.login = async (req, res) => {
  try {
    const { id, password } = req.body;
    let token;
    // validation
    if (!id || !password) {
      return res.status(400).json({
        message: "Something is missing ar Login",
        sucess: false,
      });
    }

    // check user present or not
    const findUser = await User.find({ id: id });

    if (findUser.length == 0) {
      return res.status(404).json({
        message: "Invalide credintials",
        sucess: false,
      });
    }

    if (await bcrypt.compare(password, findUser[0].password)) {
      // create a payload
      const payload = {
        id: findUser[0].id,
        role: findUser[0].role,
      };

      // creating token
      token = await jwt.sign(payload, "token", {
        expiresIn: "5d",
      });
      const options = {
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "None",  // set appropriately based on your requirements
        secure: true,
      }
      res.cookie("token", token, options).status(200).json({
        message: "User Login sucessfully",
        user: findUser,
        token: token,
      });
    } else {
      return res.status(404).json({
        message: "Password dosent match",
        sucess: false,
      });
    }

    // return res.status(200).json({
    //   message: "User Login sucessfully",
    //   user: findUser,
    //   token: token,
    // });
  } catch (e) {
    console.log("ERROR AT LOGIN", e.message);
  }
};




exports.getStudentByRollNo = async (req, res) => {

  try {
    console.log("Hello")
    const { rollno } = req.body;

    if (!rollno) {
      return res.status(400).json({
        message: "Roll no not passed"
      });
    }
    const result = await User.find({ id: rollno }).populate("personalProfile")
      .populate("familyProfile")
      .populate("academicProfile")
      .populate("attendance")
      .populate("class");


    return res.status(200).json({
      data: result,
      message: "User found by id"
    })
  } catch (e) {
    console.log("ERRROR AT GET STUDENT BY ROLL NO: ", e);
  }
}
exports.getStudent = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await User.findOne({ id: id })
      .populate("personalProfile")
      .populate("familyProfile")
      .populate("academicProfile")
      .populate("attendance")
      .populate("class");

    return res.status(200).json({
      user,
    });
  } catch (e) {
    console.log("ERROR AT GET USER:", e.message);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id)
      return res.status(400).json({
        message: "Id missing at get student by id",
      });

    const result = await User.findById({ _id: id });

    return res.status(200).json({
      data: result,
    });
  } catch (e) {
    console.log("ERROR AT GET STUDENT BY ID");
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const result = await User.find({ role: "Student" });

    return res.status(400).json({
      message: "All Students feteced succefully",
      data: result,
    });
  } catch (e) {
    console.log("ERROR AT GET ALL STUDENTS");
  }
};

exports.getAllOperators = async (req, res) => {
  try {
    const result = await User.find({ role: "Operator" });

    return res.status(200).json({
      message: "All operators feteced succefully",
      data: result,
    });
  } catch (e) {
    console.log("ERROR AT GET ALL STUDENTS");
  }
};
