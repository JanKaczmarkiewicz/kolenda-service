import * as mongoose from "mongoose";

const createDatabaseConnection = async (
  options: mongoose.ConnectionOptions = {}
) => {
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
  mongoose.connection.on("error", console.error);
};

export default createDatabaseConnection;
