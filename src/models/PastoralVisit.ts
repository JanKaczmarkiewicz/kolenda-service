import * as mongoose from "mongoose";
import { PastoralVisitDbObject } from "../types/types";

const PastoralVisitSchema = new mongoose.Schema({
  priest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hour: {
    type: Number,
    required: true,
    min: 8,
    max: 20,
  },
  acolytes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  day: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Day",
    required: true,
  },
});

const PastoralVisit = mongoose.model<PastoralVisitDbObject & mongoose.Document>(
  "PastoralVisit",
  PastoralVisitSchema
);

export default PastoralVisit;
