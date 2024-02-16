
const moogoes=require('mongoose');
const event=require("../db/event");

exports.createReport=async(req,res)=>{

    try{

        console.log("Heelo",req.body);
        const {eventName,eventDate,eventDescrition}=req.body;

        if(!eventName && !eventDate && !eventDescrition){
            return res.status(400).json({
                message:"Something missing at create Report "
            })
        }

        const result= await event.create({eventName,eventDate,eventDescription:eventDescrition})


        if(result){
            return res.status(200).json({
                message:"Event created succefully"
            });
        }else
        return res.status(400).json({
            message:"Something wenet wrong hile creating event event "
        })
    }catch(e){
    console.log("ERROR AT CREATE REPORT",e);
}

}

exports.updateReport = async (req, res) => {
    try {
        const { id, eventName, eventDate, eventDescription } = req.body;

        // Correct usage of findByIdAndUpdate
        const result = await event.findByIdAndUpdate(
            id, // ID of the document to update
            { eventName, eventDate, eventDescription }, // Update object
            { new: true } // To return the updated document
        );

        console.log(result);
        return res.status(200).json({
            data: result
        });

    } catch (e) {
        console.log("ERROR AT Update event", e);
        return res.status(500).json({ error: "Error updating event" });
    }
}



exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.body;

        // Correct usage of findByIdAndUpdate
        const result = await event.findByIdAndDelete(
            id, // ID of the document to update
        );

        console.log(result);
        return res.status(200).json({
            data: result
        });

    } catch (e) {
        console.log("ERROR AT Update event", e);
        return res.status(500).json({ error: "Error updating event" });
    }
}

exports.getAllEvents=async(req,res)=>{
    try{
        const result= await event.find({});
        return res.status(200).json({
            message:"All Events",
            data:result
        });
        
    }catch(e){
        console.log("ERROR AT GET ALL EVENTS");
    }
}


