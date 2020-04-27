import * as mongoose from "mongoose";
import { HouseDbObject } from "../types/types";

const HouseSchema = new mongoose.Schema({
  number: {
    type: String,
  },
  street: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Street",
    required: true,
  },
});

const House = mongoose.model<HouseDbObject & mongoose.Document>(
  "House",
  HouseSchema
);

export default House;
