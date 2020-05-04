import * as mongoose from "mongoose";
import { SeasonDbObject } from "../types/types";
import { seasonError } from "../errors/validations";

const SeasonSchema = new mongoose.Schema({
  year: {
    type: Number,
    min: 2000,
    max: 2100,
    requried: true,
    unique: true,
  },
});

SeasonSchema.post("save", (error: any, _: any, next: any) => {
  next(error.code === 11000 ? new Error(seasonError.exist) : error);
});

const Season = mongoose.model<SeasonDbObject & mongoose.Document>(
  "Season",
  SeasonSchema
);

export default Season;
