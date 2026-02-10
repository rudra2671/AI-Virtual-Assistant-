// import "dotenv/config";
// import express from "express"
// import dotenv from "dotenv"
// dotenv.config()
// import connectDb from "./config/db.js"
// import authRouter from "./routes/auth.routes.js"
// import cors from "cors"
// import cookieParser from "cookie-parser"
// import userRouter from "./routes/user.routes.js"
// import geminiResponse from "./gemini.js"


// const app=express()
// app.use(cors({
//     origin:"http://localhost:5173",
//     credentials:true
// }))
// const port=process.env.PORT || 5000
// app.use(express.json())
// app.use(cookieParser())
// app.use("/api/auth",authRouter)
// app.use("/api/user",userRouter)


// app.listen(port,()=>{
//     connectDb()
//     console.log("server started")
// })


import "dotenv/config";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import path from "path";
import { fileURLToPath } from "url";

import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: true,        // allow Render domain
    credentials: true
  })
);


app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);


app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});


app.listen(port, () => {
  connectDb();
  console.log("Server running on port", port);
});

