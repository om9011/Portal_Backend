const express=require('express');
const { signUp, login, getStudent, getAllStudents, getAllOperators, getUserById, getStudentByRollNo } = require('../controller/user');
const { auth, isOperator, isAdmin, isAuthenticate } = require('../controller/auth');
const { markAttendece, enrollStudent, getStudentIndivualAttendence, markShakhaAttendence, getDailyStudentCount} = require('../controller/attendence');
const { createClass, getStudentByClass, getAllClass, deleteClass, getClassById, markDailyClassUpdate, getClassByUpdate } = require('../controller/class');
const { createEvent, getAllEvents, deleteCloudEvent } = require('../controller/events');
const { aproveRequest, getAllRequest, getPendingRequest, getApproveRequest } = require('../controller/requestAccept');
const { createReport, deleteEvent, updateReport } = require('../controller/reports');
const { uploadProfilePhoto } = require('../controller/personalProfile');
const { createHighlight, updateHighlight, getAllHighlights, deleteHighlight } = require('../controller/Highlights');
const { createcontactus, getAllContactRequest } = require('../controller/contactus');

const router=express.Router();

// 
router.post("/signUp",signUp);
router.post("/login",login);
router.post("/auth",auth)
router.post("/getUserById",auth,getUserById)
router.post("/uploadPersonalPhto",auth,uploadProfilePhoto);

router.post("/getStudent",auth,getStudent)
router.post("/getAllStudents",auth,isAuthenticate,getAllStudents)
router.post("/getAllOperators",auth,isAuthenticate,getAllOperators)
router.post("/getStudentByRollNo",auth,isAuthenticate,getStudentByRollNo)

// ROutes for operator and admin
router.post("/markAttendece",auth,isAuthenticate,markAttendece)
router.post("/getStudentAttendece",auth,getStudentIndivualAttendence);
router.post("/createClass",auth,isAuthenticate,isAdmin,createClass)
router.post("/dailyUpdate",auth,isAuthenticate,markDailyClassUpdate)
router.post("/classByUpdate",auth,isAuthenticate,getClassByUpdate)
router.post("/dailyAttendence",auth,isAuthenticate,markShakhaAttendence);
router.post("/getdailyAttendence",auth,isAuthenticate,getDailyStudentCount)

// isStudent not added because Operator also a studnet
router.post("/enrollStudent",auth,enrollStudent)
router.post("/getStudentByClass",auth,isAuthenticate,getStudentByClass);
router.post("/getAllClass",auth,getAllClass)
router.post("/deleteClass",auth,isAuthenticate,deleteClass)
router.post("/classById",auth,isAuthenticate,getClassById)

router.post("/approveRequest",auth,isAdmin,aproveRequest)
router.post("/getAllRequest",auth,isAdmin,getAllRequest)
router.post("/getPendingRequest",auth,isAdmin,getPendingRequest);
router.post("/getApproveRequest",auth,isAdmin,getApproveRequest);

router.post("/createReport",auth,isAuthenticate,createReport)
router.post("/deleteReport",auth,isAuthenticate,deleteCloudEvent)


router.post("/createEvent",auth,isAuthenticate,createEvent)
router.post("/updteEvent",auth,isAuthenticate,updateReport)
router.post("/deleteEvent",auth,isAuthenticate,deleteEvent)
router.post("/getAllevents",auth,isAuthenticate,getAllEvents);

router.post("/getAllReportsRequest",auth,getAllEvents)
router.post("/cloudUpload",auth,isAuthenticate,createEvent);


router.post("/createHighlight",auth,isAdmin,createHighlight);
router.post("/updateHighlight",auth,isAdmin,updateHighlight);
router.post("/deleteHighlight",auth,isAdmin,deleteHighlight);
router.post("/getAllHighlight",auth,getAllHighlights);


router.post("/contactus",createcontactus);
router.post("/getallcontactrequest",auth,isAdmin,getAllContactRequest);

module.exports=router;