import jwt from "jsonwebtoken";
import User from "../schema/userSchema.js";

const auth = async (req, res, next) => {
  // console.log(req.body.isadmin);
  console.log(req.body);
  try {
    if (
      !(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      )
    ) {
      console.log({ error: `no authorization headers` });
      res.status(400).json({ error: `no authorization headers` });
      return;
    }

    if (req.body.isadmin === "false") {
      console.log({ error: `only admins can add the questions` });
      res.status(400).json({ error: `only admins can add the questions` });
      return;
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      console.log({ error: `invalid token` });
      res.status(400).json({ error: `invalid token` });
      return;
    }

    const verifyToken = jwt.verify(token, process.env.SECURITY_KEY);

    if (!verifyToken) {
      console.log({ error: `token verification error` });
      res.status(400).json({ error: `token verification error` });
      return;
    }

    req.user = await User.findOne({ _id: verifyToken._id });
    req.userid = verifyToken._id;
    next();
  } catch (err) {
    console.log({ error: `auth middleware error ${err}` });
    res.status(400).json({ error: `auth middleware error ${err}` });
  }
};

export default auth;
