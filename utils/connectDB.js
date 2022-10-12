import mongoose from "mongoose";

const connectDB = () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to database");
    return;
  }
  mongoose.connect(
    process.env.MONGODB_URL,
    {
      // useCreateIndex: true,
      // useFindAndModify: true,
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;
      console.log("Connected to mongodb.");
    }
  );
};

export default connectDB;
