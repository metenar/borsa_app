const express = require("express")
const mongoose = require("mongoose");
const dotenv= require("dotenv");
const cors = require("cors")
const morgan= require("morgan")
const app = express()
const cookieParser = require('cookie-parser')
const hisseRouter= require("./routes/hisse")
const userRouter= require("./routes/user")
const authRouter= require("./routes/auth")

dotenv.config()
const PORT=process.env.PORT || 5002;

mongoose
  .connect(
    process.env.MONGO_URL
  )
  .then(() => {
    console.log("DB server connected succesfully!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.use(morgan("tiny"))
app.use("/api/hisse",hisseRouter)
app.use("/api/users",userRouter)
app.use("/api/auth",authRouter)
app.use((err, req, res, next) => {
  const errorStatus=err.status || 500
  const errorMessage=err.message || "Something went wrong"
  return res.status(errorStatus).json({
      success:false,
      status:errorStatus,
      message:errorMessage,
      stack:err.stack
  })
})

app.listen(PORT,()=>{
    console.log("Backend server is running at port " + PORT)
})