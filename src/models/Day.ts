import * as mongoose from "mongoose";

const DaySchema = new mongoose.Schema({
  season: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  visitTime: {
    type: Date,
    required: true,
  },
  reeceTime: {
    type: Date,
    required: true,
  },
});

const Day = mongoose.model<DayDbObject & mongoose.Document>("Day", DaySchema);

export default Day;
