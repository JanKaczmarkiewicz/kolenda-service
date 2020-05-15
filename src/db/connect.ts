import * as mongoose from "mongoose";

const createDatabaseConnection = async (
  options: mongoose.ConnectionOptions = {}
) => {
  if (mongoose.connection.readyState == 1) return;

  mongoose.connection.on("error", console.error);

  await mongoose
    .connect(process.env.MONGO_URL as string, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      ...options,
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export default createDatabaseConnection;
