import User from "../schema/userSchema.js";
import Question from "../schema/quesSchema.js";

export const addQuestions = async (req, res) => {
  const {
    title,
    question,
    option1,
    option2,
    option3,
    option4,
    answer,
    isadmin,
  } = req.body;

  if (
    !title ||
    !question ||
    !option1 ||
    !option2 ||
    !option3 ||
    !option4 ||
    !answer
  ) {
    res.status(400).json({ error: `Please provide all the required fields` });
    console.log({ error: `Please provide all the required fields` });
    return;
  }

  if (isadmin === "false") {
    console.log(`only admins can add the questions`);
    res.status(400).json(`only admins can add the questions`);
    return;
  }
  try {
    const newQuestion = new Question({
      title,
      question,
      option1,
      option2,
      option3,
      option4,
      answer,
      user: req.userid,
    });

    const savedQuestion = await newQuestion.save();
    if (!savedQuestion) {
      console.log({ error: `question not saved` });
      res.status(400).json({ error: `question not saved` });
      return;
    }

    res.status(200).json({ savedQuestion });
    return;
  } catch (err) {
    console.log({ error: `adding question  error ${err}` });
    res.status(400).json({ error: `adding question error ${err}` });
  }
};

export const getQuestion = async (req, res) => {
  const _id = req.params.id;
  try {
    const question = await Question.findById({ _id });

    res.status(200).json(question);
  } catch (err) {
    console.log({ error: `edit question error ${err}` });
    res.status(400).json({ error: `edit question error ${err}` });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const allQuestions = await Question.find().populate("user");
    res.status(200).json(allQuestions);
    console.log(allQuestions);
  } catch (err) {
    console.log({ error: `user signup error ${err}` });
    res.status(400).json({ error: `user signup error ${err}` });
  }
};

export const editQuestion = async (req, res) => {
  const _id = req.params.id;
  // const { title, question, option1, option2, option3, option4, answer } =
  req.body;
  try {
    const questionToEdit = await Question.findByIdAndUpdate({ _id }, req.body, {
      new: true,
    });

    console.log(questionToEdit);
    res.status(200).json(questionToEdit);
  } catch (err) {
    console.log({ error: `edit question error ${err}` });
    res.status(400).json({ error: `edit question error ${err}` });
  }
};

export const deleteSingleQuestion = async (req, res) => {
  const _id = req.params.id;
  try {
    const questionToDelete = await Question.findByIdAndDelete({ _id });
    console.log(questionToDelete);
    res.status(400).json(questionToDelete);
  } catch (err) {
    console.log({ error: `delete question error ${err}` });
    res.status(400).json({ error: `delete question error ${err}` });
  }
};

export const deleteAllQuestions = async (req, res) => {
  try {
    await Question.deleteMany();
  } catch (err) {
    console.log({ error: `deleting all question error ${err}` });
    res.status(400).json({ error: `deleting all question error ${err}` });
  }
};
