const Class = require("../db/class");
const dailyUpdate = require("../db/dailyClassUpdate");
const User = require("../db/user");

exports.createClass=async(req,res)=>{

    try{

        const{classsName, classTeacher}=req.body;
        if(!classsName || !classTeacher)
            return res.status(400).json({
        message:"Something missing at the  create class"})

        const studentList=[]
        const  updateForClass="No Update"
        const updateInFileFormate="No Update"

        // check if class is already preasent or not
        const checkClass = await Class.findOne({ classsName: classsName });

        if (checkClass) {
            return res.status(400).json({
                message: "This class is already present"
            });
        }
        

        const createClass= await Class.create({classsName:classsName,classTeacher:classTeacher,studentList:studentList,updateForClass:updateForClass,updateInFileFormate:updateInFileFormate});

        console.log(createClass)
        if(createClass)
                return res.status(200).json({message:"Class created succefully",
            createClass,
            sucess:true})


    }catch(e){
        console.log("ERROR AT CREATE CLASS:",e.message);
    }
}

exports.getClassById=async(req,res)=>{
    try{

        const {id}=req.body;

        if(!id)
            return res.status(400).json({
        message:"Id missing at ClassBy ID "})

        const result=await Class.findById({_id:id});

        return res.status(200).json({
            message:"Data Fetched succfully",
            data:result
        })

    }catch(e){
        console.log("ERROR AT GET CLASS BY ID",e)
    }
}


exports.getStudentByClass=async(req,res)=>{

    try{
    
        const{classId}=req.body;
    
        if(!classId){
            return res.status.json({message:"Something missing at getclass studnet"});
        }
    
        const result=await Class.findById({_id:classId});
    
        // console.log(result)
        // if(result)
        const studentList = [];
        if(result==null)
            return res.status(400).json({
                message:"Class not presnet"
            })

        // Loop through eacht ID in the class and fetch their data
        for (const studentId of result.studentList) {
            const student = await User.findById({ _id: studentId });
    
            if (student) {
                studentList.push(student);
            }
        }
        const teacherId = result.classTeacher;
        const teacher = await User.findById({ _id: teacherId });
    
        console.log(teacher);
    
        return res.status(200).json({
            message: "Students fetched successfully",
            classTeacher:teacher,
            data: studentList,
        });
    
    }catch(e){
        console.log("ERROR AT STUDENTBYCLASS:",e.message)
    }
    
    }
    

exports.getAllClass=async(req,res)=>{

    try{

        const result=await Class.find({});
        // console.log(result)

        return res.status(200).json({
            result
        })

    }catch(e){
        console.log("ERROR AT GET ALL CLASS ",e)
    }
}

exports.deleteClass=async(req,res)=>{

    try{
        const{classId}=req.body;
    
        if(!classId){
            return res.status.json({message:"Something missing at getclass studnet"});
        }
    
        const result=await Class.findById({_id:classId});
        const deleteClass=await Class.findByIdAndDelete({_id:classId});
        // console.log(result)
        // if(result)
        const studentList = [];
        if(result==null)
            return res.status(400).json({
                message:"Class not presnet"
            })

        // Loop through each student ID in the class and fetch their data
        for (const studentId of result.studentList) {
            const student = await User.findById({ _id: studentId });
    
            if (student) {
                student.class=null;
                student.save();
                studentList.push(student);
            }
        }
        

        return res.status(200).json({
            message:"Student class succfully",
            studentList
        })
    }catch(e){
        console.log("ERROR AT DELETE CLASS",e);
    }
}


exports.markDailyClassUpdate = async(req,res)=>{

    
        try{
    
        const{classTeacher,subject,whatTeaches,date,classId}=req.body;

        if(!classTeacher || !subject || !whatTeaches || !date)
            return res.status(400).json({
        message:"Data missing at daily update"})


        const result= await dailyUpdate.create({classTeacher,subject,whatTeaches,date});
        

        if(result){

            const add=await Class.findById({_id:classId});

            add.dailyUpdate.push(result._id);
            add.save();
            return res.status(200).json({
                message:"Daily Update added sucessfully"});
        }
        else
        return res.status(400).json({
            message:"SOme thing went wrong at Daily Update added sucessfully"});


        }catch(e){
            console.log("ERROR AT DAILY UPDATE ",e)
        }

}

exports.getClassByUpdate=async(req,res)=>{

    try{
        const {id}=req.body;

        if(!id)
            return res.status(400).json({
        message:"Id missing at getClassUpdate"});

        const result= await Class.findById({_id:id});

        const data=[];

        for( i of result.dailyUpdate){
            console.log(i)
            const individualDailyUpdate=await dailyUpdate.findById({_id:i});
            console.log(individualDailyUpdate)
            data.push(individualDailyUpdate)
        }

        return res.status(200).json({
            data:data,
            message:"All data fetched sucessfully"
        })
    }catch(e){
        console.log("ERROR AT Get CLASS UPDATE ",e);
    }
}
