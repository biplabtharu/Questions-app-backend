import dotenv from "dotenv";
dotenv.config();
import connectDb from "./conn/conn.js";
import express from "express";
import userRoute from "./routes/userRoute.js";
import quesRoute from "./routes/quesRoute.js";
// import auth from "./middleware/auth.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/users/", userRoute);
app.use("/api/v1/questions/", quesRoute);

app.listen(port, () => {
  connectDb();
  console.log(`listening at port ${port}`);
});
