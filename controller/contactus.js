const contactSchma = require("../db/contactus");

exports.createcontactus=async(req,res)=>{
    try{
        const{firstName,lastName,contact,message}=req.body;

        if(!firstName || !lastName || !contact || !message)
            return res.status(404).json({
        message:"SOmething missing at create contact"});

        const result= await contactSchma.create({firstName,lastName,contact,message});

        if(result){
            return res.status(200).json({
                message:"Thank you for giving feed back"
            })
        }
    }catch(e){
        console.log("ERROR AT CONTACT US ",e);
    }
}

exports.getAllContactRequest=async(req,res)=>{
    try{    

        const result=await contactSchma.find({});
        return res.status(200).json({
            data:result
        })

    }catch(e){
        console.log("ERROR AT GET ALL CONTACT US ",e);
    }
}