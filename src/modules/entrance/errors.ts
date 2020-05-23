import { RecordState } from "../../types/types";

export default {
  entrance: {
    stateFormat: `State should be one of: ${Object.values(RecordState).join(
      ", "
    )}!`,
  },
};
