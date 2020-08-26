import * as mongoose from "mongoose"

export const castToObjectId = (str:string) =>  new mongoose.mongo.ObjectId (str)