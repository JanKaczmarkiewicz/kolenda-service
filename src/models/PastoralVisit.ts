import * as mongoose from "mongoose";
import { PastoralVisitDbObject } from "../types/types";

const PastoralVisitSchema = new mongoose.Schema({
  priest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  acolytes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  season: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Season",
    required: true,
  },
});

const PastoralVisit = mongoose.model<PastoralVisitDbObject & mongoose.Document>(
  "PastoralVisit",
  PastoralVisitSchema
);

export default PastoralVisit;
