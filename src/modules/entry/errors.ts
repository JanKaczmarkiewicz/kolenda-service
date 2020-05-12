import { RecordState } from "../../types/types";

export default {
  entry: {
    stateFormat: `State should be one of: ${Object.values(RecordState).join(
      ", "
    )}!`,
  },
};
