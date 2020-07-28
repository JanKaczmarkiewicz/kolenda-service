import * as mongoose from "mongoose";
import { DayDbObject } from "../types/types";

const DaySchema = new mongoose.Schema({
  assignedStreets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Street",
    },
  ],
  visitDate: {
    type: Date,
    required: true,
  },
  reeceDate: {
    type: Date,
    required: true,
  },
  season: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Season",
    required: true,
  },
});

const Day = mongoose.model<DayDbObject & mongoose.Document>("Day", DaySchema);

export default Day;
