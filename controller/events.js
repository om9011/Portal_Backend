const { uploadImageToCloudinary } = require("../config/imageUpload");
const report = require("../db/reports");
// const } =require("../db/reports")

exports.createEvent=async(req,res)=>{

    try{
        console.log(req.body);;
        console.log(req.files);
        const {monthName,descitopn}=req.body;
        const reportFile=req.files.reports
        console.log("File",reportFile)
        console.log("Month",monthName)

        if(! monthName)
            return res.status(400).json({
        message:"something missing at upload cloud"})


        // upload file to cloud
        const updateCloud=await uploadImageToCloudinary(
            reportFile,
           "ds3cpwvtf"
        )

        console.log("File uploaded :",updateCloud);

        // make entry in DB;
        const updateDB=await report.create({
            monthName,
            file:updateCloud.url,
            eventdecription:descitopn
        }) 

        console.log("Update DB",updateDB)

        return res.status(200).json({
            updateDB,
            updateCloud
        })

    }catch(e){
        console.log("ERROR AT CREATE EVENT:",e)
    }
}


exports.deleteCloudEvent=async(req,res)=>{
    try{

        const {id}=req.body;

        const result=await report.findByIdAndDelete({
            _id:id
        });

        return res.status(200).json({
           result
        })
    }catch(e){
        console.log("ERROR AT DELETE EVENT",e)
    }
}
exports.getAllEvents=async(req,res)=>{

    try{

        const result= await report.find({});

        return res.status(200).json({
            data:result
        })
        
    }catch(e){  
        console.log("ERRORA AT GET EVENTS",e);
    }
}