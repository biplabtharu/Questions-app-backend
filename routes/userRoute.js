import express from "express";
import {
  userSignIn,
  userSignUp,
  getSingleUser,
  getAllUser,
  deleteSingleUser,
  deleteAllUser,
} from "../controller/userController.js";
const userRoute = express.Router();

userRoute.post("/signin", userSignIn);
userRoute.post("/signup", userSignUp);

userRoute.get("/:id", getSingleUser);
userRoute.get("/", getAllUser);

userRoute.delete("/:id", deleteSingleUser);
userRoute.delete("/", deleteAllUser);

export default userRoute;
