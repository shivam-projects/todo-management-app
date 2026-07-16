import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Todo API Running"
    });
});

app.use("/todos", todoRoutes);

export default app;