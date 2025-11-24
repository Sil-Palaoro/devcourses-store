import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes";
import coursesRouter from "./routes/course.routes";
import categoriesRouter from "./routes/category.routes";
import cartRouter from "./routes/cart.routes";
import orderRouter from "./routes/order.routes";
import paymentRouter from "./routes/payment.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/users", userRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/payments", paymentRouter);



app.use((err: any, req:any, res:any, next:any) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || "Internal Server Error"});    
})

export default app;