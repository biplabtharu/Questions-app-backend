import mongoose from "mongoose";

const quesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    question: {
      type: String,
      trim: true,
      required: true,
    },

    option1: {
      type: String,
      trim: true,
      required: true,
    },
    option2: {
      type: String,
      trim: true,
      required: true,
    },
    option3: {
      type: String,
      trim: true,
      required: true,
    },
    option4: {
      type: String,
      trim: true,
      required: true,
    },
    answer: {
      type: String,
      trim: true,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("question", quesSchema);

export default Question;
