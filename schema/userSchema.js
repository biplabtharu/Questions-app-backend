import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 50,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isadmin: {
      type: Boolean,
      default: false,
    },
    questions: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "question",
    },
  },
  { timestamps: true }
);

userSchema.methods.generateToken = async function (req, res) {
  try {
    const _id = this._id;
    console.log(_id);
    const token = jwt.sign({ _id }, process.env.SECURITY_KEY);
    return token;
  } catch (err) {
    console.log({ error: `jsonwebtoken error ${err}` });
    res.status(400).json({ error: `jsonwebtoken error ${err}` });
  }
};

userSchema.pre("save", async function (req, res) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    // next();
  } catch (err) {
    console.log({ error: `bcrypt error ${err}` });
    res.status(400).json({ error: `bcrypt error ${err}` });
  }
});
const User = mongoose.model("user", userSchema);

export default User;
