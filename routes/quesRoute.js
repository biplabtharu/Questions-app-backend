import express from "express";
import {
  addQuestions,
  getQuestion,
  getAllQuestions,
  editQuestion,
  deleteSingleQuestion,
  deleteAllQuestions,
} from "../controller/quesController.js";
import auth from "../middleware/auth.js";

const quesRoute = express.Router();

quesRoute.post("/", auth, addQuestions);

quesRoute.get("/:id", getQuestion);
quesRoute.get("/", getAllQuestions);

quesRoute.put("/:id", auth, editQuestion);

quesRoute.delete("/:id", auth, deleteSingleQuestion);
quesRoute.delete("/", deleteAllQuestions);

export default quesRoute;
