import * as mongoose from "mongoose";
import createDatabaseConnection from "../db/connect";

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany({});
  }
}

export const setup = async () => {
  await createDatabaseConnection();
  await removeAllCollections();
};
