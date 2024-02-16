const { uploadImageToCloudinary } = require("../config/imageUpload");
const highlight = require("../db/Highlights");



exports.createHighlight=async(req,res)=>{

    try{
        const{title,description,newType}=req.body;
        const image=req.files.image;

        if(!title || !image || !description || !newType)
            return res.status(400).json({
            message:"Something missing at createHighlight"
         })

         const updateCloud=await uploadImageToCloudinary(
           image,
           "ds3cpwvtf"
        )
         const result= await highlight.create({
            title,image:updateCloud.url,description,newType
         });

         return res.status(200).json({
            message:"Highlight created succefully",
            result
         })
        
        }catch(e){
        console.log("ERROR AT CREATE Highlight",e.message);
    }
}

exports.updateHighlight=async(req,res)=>{

    try{

        const{id, title,description}=req.body;
        const image=req.files.image;

        if(!id || !title || !image || !description)
            return res.status(400).json({
            message:"SOmething missing at createHighlight"
         })
         const updateCloud=await uploadImageToCloudinary(
            image,
            "ds3cpwvtf"
         )
         const result=await highlight.findByIdAndUpdate({_id:id},{title,image:updateCloud.url,description},{new:true});

         if(result){
            return res.status(200).json({
                message:"Highlight Updated succefully",
                data:result
            })     
        
        // return res.status(200).
    }

    }catch(e){
        console.log("ERROR AT UPDATE HIGHLIGHT",e.message);
    }
}


exports.deleteHighlight=async(req,res)=>{

    try{

        const{id}=req.body;

        if(!id){
            return res.status(400).json({
                message:"Something missing at deleteHighlight"
            })
        }

        const result=await highlight.findByIdAndDelete({_id:id});

        return res.status(200).json({
            message:"Highlight deleted succefully"
        })
    }catch(e){
        console.log("ERROR AT DELETE HIGHLIGHT ",e.message);;
    }
}

exports.getAllHighlights=async(req,res)=>{

    try{

        const {newType}=req.body;
        if(!newType){
            return res.status(404).json({
                message:"Type not forund"
            })
        }
        if(newType=="All"){
            const result= await highlight.find( );
            console.log(result);
            return res.status(200).json({
                message:"All highlights",
                data:result
            })
        }

        const result=await highlight.find({newType:newType});
        return res.status(200).json({
            message:newType,
            data:result
        })
        }catch(e){
        console.log("ERROR AT  GET HIGHGLIGHTS ",e.message);
    }
}