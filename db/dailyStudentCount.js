const moogoes=require('mongoose');

const dailyStudentschma=moogoes.Schema({

    startCount:{
        type:String,
        require:true
    },
    
    MiddleCount:{
        type:String,
        require:true
    },
    
    endCount:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    }

});

const dailyStudentCount=moogoes.model("dailyStudentCount",dailyStudentschma);
module.exports=dailyStudentCount;