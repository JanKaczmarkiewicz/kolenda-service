import * as mongoose from "mongoose";
import { StreetDbObject } from "../types/types";
import { streetError } from "../errors/validations";

const StreetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

StreetSchema.post("save", (error: any, _: any, next: any) => {
  next(error.code === 11000 ? new Error(streetError.exist) : error);
});
const Street = mongoose.model<StreetDbObject & mongoose.Document>(
  "Street",
  StreetSchema
);

export default Street;
