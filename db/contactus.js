const moogoes=require('mongoose');

const contact =new moogoes.Schema({

    firstName:{
        type:String,
        require:true
    },
    
    lastName:{
        type:String,
        require:true
    },
    
    contact:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    }
})

const contactSchma=new moogoes.model("contact",contact);
module.exports=contactSchma;