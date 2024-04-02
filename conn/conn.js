import mongoose from "mongoose";

const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(console.log(`mongodb connected`))
    .catch((err) => console.log(`mongodb connection error ${err}`));
};

export default connectDb;
