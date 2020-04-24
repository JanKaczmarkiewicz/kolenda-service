import * as mongoose from "mongoose";
import { StreetDbObject } from "../types/types";

const StreetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Street = mongoose.model<StreetDbObject & mongoose.Document>(
  "Street",
  StreetSchema
);

export default Street;
