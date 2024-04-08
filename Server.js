const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors=require("cors")
// for db connection
const db = require("./config/db");
const port = process.env.PORT || 4000;
const userRouter=require("./router/userRouter");
const personalProfileRouter=require("./router/Profile");
const fileUpload=require("express-fileupload");
const { cloudinaryConnect } = require("./config/cloundinary");

const {mongoose}=require("./config/db")
require("dotenv").config();
app.use(bodyParser.json());
app.use(express.json());


app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);


app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}))

app.listen(port,(req,res)=>{
  console.log(`Conneted at ${port}`)
})

cloudinaryConnect();
app.use("/v1/user",userRouter);
app.use("/v1/profile/personalProfile",personalProfileRouter);
