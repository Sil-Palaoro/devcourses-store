import express from "express";
import cors from "cors";
import userRouter from "./routes/users";
import coursesRouter from "./routes/courses";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/courses", coursesRouter);

app.use((err: any, req:any, res:any, next:any) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || "Internal Server Error"});    
})

export default app;