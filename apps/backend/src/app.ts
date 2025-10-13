import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes";
import coursesRouter from "./routes/course.routes";
import categoriesRouter from "./routes/category.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/categories", categoriesRouter);

app.use((err: any, req:any, res:any, next:any) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || "Internal Server Error"});    
})

export default app;