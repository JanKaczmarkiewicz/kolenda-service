import { RecordState } from "../../types/types";

export default {
  entrance: {
    stateFormat: `State should be one of: ${Object.values(RecordState).join(
      ", "
    )}!`,
  },
  house: {
    allowedStreet:
      "House should belong to street that is in streets assigned to day",
  },
};
