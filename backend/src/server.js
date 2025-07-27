import express from "express"
import notesRoutes from "../src/routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import rateLimiter from "./middleware/ratelimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();



const app = express()
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();


//middleware
if(process.env.NODE_ENV !== "production"){
    app.use(cors({
    origin:"http://localhost:5173"
}));
}
app.use(express.json()); //this middleware will allow you to parse JSON bodies : req.body
app.use(rateLimiter);


//simple custom middleware
// app.use((req,res,next) => {
//     console.log(`Req method is ${req.method} and URL is ${req.url}`);
//     next();
// });

//routes
app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production"){
        app.use(express.static(path.join(__dirname, "../frontend/dist")))

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
})
    }



connectDB().then(() => {
    app.listen(PORT, ()=>{
    console.log("Server started on PORT:", PORT);
    });
});

//6Wx6tK1Fk3iJ29Rm
//mongodb+srv://vivekpatil200320:6Wx6tK1Fk3iJ29Rm@cluster0.jyqgxcn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0