import * as mongoose from "mongoose";
import { EntryDbObject, RecordState } from "../types/types";
import errors from "../modules/entry/errors";

const EntrySchema = new mongoose.Schema<EntryDbObject>({
  house: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "House",
    required: true,
  },
  visitState: {
    type: String,
    enum: {
      values: Object.values(RecordState),
      message: errors.entry.stateFormat,
    },
    default: RecordState.Unknown,
  },
  reeceState: {
    type: String,
    enum: {
      values: Object.values(RecordState),
      message: errors.entry.stateFormat,
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

const Entry = mongoose.model<EntryDbObject & mongoose.Document>(
  "Entry",
  EntrySchema
);

export default Entry;
