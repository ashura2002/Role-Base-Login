import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import connectDB from "./config/connectDB.js";
import { NotFound } from "./lib/ApiError.js";
import { errHandling } from "./middleware/errorHandlingMiddleware.js";
import formRoute from "./routes/formRequest.route.js";
import attendanceRouter from "./routes/attendance.route.js";
import departmentRoute from "./routes/department.route.js";


dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
app.use(cors()); // e try a recommended  version nga approach ang naka array
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.use("/api", userRoutes);  
app.use('/requests', formRoute);
app.use('/employees', attendanceRouter)
app.use('/api', departmentRoute)


app.use((req, res, next) =>{
  next(new NotFound(`This ${req.originalUrl} path is not found!`))
})

// middleware paras error
app.use(errHandling)


connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});