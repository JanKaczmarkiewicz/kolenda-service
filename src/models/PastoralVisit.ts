import * as mongoose from "mongoose";
import { PastoralVisitDbObject } from "../types/types";

const PastoralVisitSchema = new mongoose.Schema({
  priest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hour: {
    type: String,
    required: true,
    match: /^(1[2-9]|2[0-1]):[0-5][0-9]$/,
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
