
const express = require("express");
const connectdb = require("./config/database");
const cookieparser= require("cookie-parser")
const authRouter= require("./routes/auth")
const requestRouter= require("./routes/request")
const profileRouter= require("./routes/profile")
const userRouter = require("./routes/userr")
const cors= require("cors")
const app = express()
app.use(express.json())
app.use(cookieparser())
app.use(cors({origin:"http://localhost:5173",credentials:true}))


app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)

connectdb()
  .then(() => {
    console.log("DB connected");
    app.listen(5567, () => {
      console.log("Server running on port 5567");
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });
