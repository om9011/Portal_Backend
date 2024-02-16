const express=require('express');
const { createPersonalProfile } = require('../controller/personalProfile');
const{updateFamilyProfile}=require("../controller/familyProfile");
const{updateAcedamicDetails}=require("../controller/acedamicProfile");
const {auth}=require("../controller/auth")
const router=express.Router();


router.post("/updatePerProfile",auth,createPersonalProfile);
router.post("/updateFamProfile",auth,updateFamilyProfile);
router.post("/updateAcProfile",auth,updateAcedamicDetails)
module.exports=router;