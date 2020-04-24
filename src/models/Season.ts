import * as mongoose from "mongoose";
import { SeasonDbObject } from "../types/types";

const SeasonSchema = new mongoose.Schema({
  year: {
    type: Number,
    min: 2000,
    max: 2100,
    requried: true,
  },
});

const Season = mongoose.model<SeasonDbObject & mongoose.Document>(
  "Season",
  SeasonSchema
);

export default Season;
