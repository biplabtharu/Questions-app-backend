import User from "../schema/userSchema.js";
import bcrypt from "bcryptjs";

// ----------------------------------USER SIGN IN-------------------------------------

export const userSignIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email | !password) {
    res.status(400).json({ error: `Please provide all the required fields` });
    console.log({ error: `Please provide all the required fields` });
    return;
  }
  try {
    const isUser = await User.findOne({ email });
    if (!isUser) {
      console.log({ error: `invalid email` });
      res.status(400).json({ error: `invalid email` });
      return;
    }
    const verifyPassword = await bcrypt.compare(password, isUser.password);

    if (!verifyPassword) {
      console.log({ error: `invalid password` });
      res.status(400).json({ error: `invalid password` });
      return;
    }

    const token = await isUser.generateToken();

    console.log({ _id: isUser._id, email: isUser.email, token: token });
    res.status(200).json({
      _id: isUser._id,
      firstname: isUser.firstname,
      email: isUser.email,
      token: token,
      isadmin: isUser.isadmin,
    });
    // return;
  } catch (err) {
    console.log({ error: `user signin error ${err}` });
    res.status(400).json({ error: `user signin error ${err}` });
  }
};

// ----------------------------------USER SIGN UP-------------------------------------
export const userSignUp = async (req, res) => {
  const { firstname, lastname, email, password, isadmin } = req.body;

  if (!firstname || !lastname || !email || !password) {
    res.status(400).json({ error: `Please provide all the required fields` });
    console.log({ error: `Please provide all the required fields` });
    return;
  }
  try {
    const isUser = await User.findOne({ email });

    if (isUser) {
      console.log({ error: `user already exists` });
      res.status(400).json({ error: `user already exists` });
      return;
    }

    const user = new User({
      firstname,
      lastname,
      email,
      password,
      isadmin,
    });
    // console.log(user);

    const token = await user.generateToken();
    console.log(token);
    const savedUser = await user.save();
    // console.log(savedUser);

    res.status(200).json({
      _id: savedUser._id,
      firstname: savedUser.firstname,
      email: savedUser.email,
      token: token,
      isadmin: savedUser.isadmin,
    });
  } catch (err) {
    console.log({ error: `user signup error ${err}` });
    res.status(400).json({ error: `user signup error ${err}` });
  }
};

export const getSingleUser = () => {};

export const getAllUser = async (req, res) => {
  const allUsers = await User.find();
  res.status(200).json(allUsers);
};

export const deleteSingleUser = () => {};

export const deleteAllUser = async (req, res) => {
  await User.deleteMany();
  res.json("deleted successfully");
};
