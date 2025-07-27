import express from "express"
import notesRoutes from "../src/routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import rateLimiter from "./middleware/ratelimiter.js";
import cors from "cors";


dotenv.config();



const app = express()
const PORT = process.env.PORT || 5001;

//middleware
app.use(cors({
    origin:"http://localhost:5173"
}));
app.use(express.json()); //this middleware will allow you to parse JSON bodies : req.body
app.use(rateLimiter);


//simple custom middleware
// app.use((req,res,next) => {
//     console.log(`Req method is ${req.method} and URL is ${req.url}`);
//     next();
// });

//routes
app.use("/api/notes", notesRoutes)



connectDB().then(() => {
    app.listen(PORT, ()=>{
    console.log("Server started on PORT:", PORT);
    });
});

//6Wx6tK1Fk3iJ29Rm
//mongodb+srv://vivekpatil200320:6Wx6tK1Fk3iJ29Rm@cluster0.jyqgxcn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0