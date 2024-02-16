const mailSender = require("../config/mailSender");
const requetsDB = require("../db/requestDB");
const User = require("../db/user");

exports.aproveRequest = async (req, res) => {
  try {

    const {userId,adminId,reqId,status,role}=req.body;

    if(!userId || !adminId || !status || !role || !reqId)
        return res.status(400).json({
    message:"Something missing at the aprove status"});

    if(status=="Approved"){
// update user
        const user=await User.findById({_id:userId});
        user.role=role
        user.save();

        // update requestDB
        const requestAccept=await requetsDB.findByIdAndUpdate({_id:reqId},{status:status,admin:adminId})

        const sendMail=await mailSender(user.email,"Regarding Your request","Congratulations your Status is role is updated to  "+ role);

        console.log(sendMail);
    }else{
        const user=await User.findById({_id:userId});
        user.role="Student"
        user.save();

        // update requestDB
        const requestAccept=await requetsDB.findByIdAndUpdate({_id:reqId},{status:"Disapproved",admin:adminId})
        const sendMail=await mailSender(user.email,"Regarding Your request","Your request is diapproved for this "+ role+ "   role");
    }


    return res.status(200).json({
        message:"Request Approved "
    })



  } catch (e) {
    console.log("ERROR AT APPROVE REQUEST:", e);
  }
};


exports.getAllRequest=async(req,res)=>{

    try{
        const result=await requetsDB.find({});;

        return res.status(200).json({
            dat:result
        })
    }catch(e){
        console.log("ERROR AT THE GET ALL REQUEST ",e)
    }
}

exports.getPendingRequest=async(req,res)=>{

    try{

        const result=await requetsDB.find({
            status:"Pending"});
        
            return res.status(200).json({
                data:result
            })

        
    }catch(e){
        console.log("ERROR AT PENDING REQUEST",e);
    }
}

exports.getApproveRequest=async(req,res)=>{
    try{

        const result=await requetsDB.find({
            status:"Approved"});
        
            return res.status(200).json({
                data:result
            })

        
    }catch(e){
        console.log("ERROR AT Approve REQUEST",e);
    }
}