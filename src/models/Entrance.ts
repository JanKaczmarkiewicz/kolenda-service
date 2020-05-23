import * as mongoose from "mongoose";
import { EntranceDbObject, RecordState } from "../types/types";
import errors from "../modules/entrance/errors";

const EntranceSchema = new mongoose.Schema<EntranceDbObject>({
  house: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "House",
    required: true,
  },
  visitState: {
    type: String,
    enum: {
      values: Object.values(RecordState),
      message: errors.entrance.stateFormat,
    },
    default: RecordState.Unknown,
  },
  reeceState: {
    type: String,
    enum: {
      values: Object.values(RecordState),
      message: errors.entrance.stateFormat,
    },
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
