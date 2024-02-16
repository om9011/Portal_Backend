const Attendance = require("../db/attendance");
const Class = require("../db/class");
const dailyStudentCount = require("../db/dailyStudentCount");
const dailyStudent = require("../db/dailyStudentCount");
const User = require("../db/user");
const wbm = require("wbm");

exports.markAttendece = async (req, res) => {
  try {
    console.log("Hello");
    const { allStudents, userId, data } = req.body;

    console.log(allStudents)
    for (var i in allStudents) {
      console.log(allStudents[i].status, "    ", allStudents[i].attendenceId);

      const attendenceId = allStudents[i].attendanceId
      const status = allStudents[i].status;
      // console.log(req.body);
      if (!attendenceId || !userId || !data || !status)
        return res.status.json({
          message: "Something missing at markAttendence",
        });

      const newEntry = {
        data,
        profile: userId,
        status: status,
      };

      const result = await Attendance.findById({ _id: attendenceId }).then(
        (addEntry) => {
          console.log("Add entry ", addEntry)
          if (addEntry) {
            addEntry.attendance.push(newEntry);
            return addEntry.save();
          }
        }

      );
      //    result.push(result);
      console.log("Result :", result)
    }

    return res.status(200).json({
      message: "Attendece mark suceefully",
      sucess: true,

    });
  } catch (e) {
    console.log("ERROR AT MARK ATTENDECE:", e.message);
  }
};

// exports.markAttendece=async(req,res)=>{

//     try{

//         const {allStudents}=req.body;

//         for(var i;i<allStudents.size;i++)
//             console.log(allStudents[i].status,"    ",allStudents[i].studentId)

//         const {attendenceId,userId,data,status}=req.body;
//         console.log(req.body)
//         if(!attendenceId||!userId || !data || !status)
//             return res.status.json({
//                 message:"Something missing at markAttendence"
//             })

//         const newEntry={
//             data,
//             profile:userId,
//             status:status
//         }

//         const result =await Attendance.findOne({_id:attendenceId}).then(addEntry=>{

//             if(addEntry){
//                 addEntry.attendance.push(newEntry)
//                 return addEntry.save();
//             }

//         })

//         return res.status(200).json({
//             message:"Attendece mark suceefully",
//             sucess:true
//         })

//     }catch(e){
//         console.log("ERROR AT MARK ATTENDECE:",e.message);
//     }
// }

exports.getStudentIndivualAttendence=async(req,res)=>{

  try{

    const {attendeceId}=req.body;
    if(!attendeceId)
      return res.status(400).json({
    message:"attendece Id not passed"});

    const result =await Attendance.findById({_id:attendeceId});

    if(result)
        return res.status(200).json({
                  message:"Attendece get suceefully",
                  sucess:true,
                  data:result
              })
      else
      return res.status(400).json({
        message:"something wrong at attendece get"});
    

  }catch(e){
    console.log("ERROR AT Get student attendence")
  }
}


exports.enrollStudent = async (req, res) => {
  try {
    const { userId, classId } = req.body;

    if (!userId || !classId)
      return res.status(400).json({
        message: "Something missing at enrollStudnet",
      });

    // find student
    const findStudent = await User.findById({ _id: userId });

    // if student not enrolled in any course
    if (findStudent.standard == null) {
      // update studnet
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { standard: classId },
        { new: true }
      );

      console.log("Updated Studnet:", updatedUser);

      // update the class studnet list

      const updateClass = await Class.findById({ _id: classId });

      if (updateClass) {
        updateClass.studentList.push(userId);
        await updateClass.save();
      }

      return res.status(200).json({
        message: "Studnet updated sucessfully",
      });
    } else {
      return res.status(400).json({
        message: "Student Already enrolled in course",
      });
    }
  } catch (e) {
    console.log("ERROR AT ENROLLSTUDENT:", e);
  }
};


exports.markShakhaAttendence=async(req,res)=>{
try{

  const { startCount,MiddleCount, endCount,date}=req.body;

  if(!startCount || !MiddleCount || !endCount || !date)
    return res.status(400).json({
  message:"SOmething missing at mark sStudent"});


  const result= await dailyStudentCount.create({startCount,MiddleCount,endCount,date});


  if(result)
      res.status(200).json({
    message:"Attendence mark succcesfully"})
}catch(E){
  console.log("ERROR AT SHAKHA ATTENDCE ",E)
}

}

exports.getDailyStudentCount=async(req,res)=>{

  try{

    const result=await dailyStudentCount.find({});

    const total=[];
    for( i of result){

      let avgcount=(i.startCount+i.MiddleCount+i.endCount)/3.0;
      total.push(i.date,avgcount);
    }

    return res.status(200).json({
      data:result
    })
  }catch(e){
    console.log("ERROR AT GET STUDENT COUNT",e);
  }
}


// exports.get