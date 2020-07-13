import * as mongoose from "mongoose";
import { EntranceDbObject, RecordState } from "../types/types";
import errors from "../modules/entrance/errors";

const EntranceSchema = new mongoose.Schema<EntranceDbObject>({
  house: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "House",
    required: true,
  },
  hour: {
    type: Number,
    required: true,
    min: 8,
    max: 20,
  },
  visitState: {
    type: String,
    enum: {
      values: Object.values(RecordState),
      message: errors.entrance.stateFormat,
    },
    required: true,
    default: RecordState.Unknown,
  },
  reeceState: {
    type: String,
    enum: {
      values: Object.values(RecordState),
      message: errors.entrance.stateFormat,
    },
    required: true,
    default: RecordState.Unknown,
  },
  pastoralVisit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PastoralVisit",
    required: true,
  },
  comment: String,
});

const Entrance = mongoose.model<EntranceDbObject & mongoose.Document>(
  "Entrance",
  EntranceSchema
);

export default Entrance;
