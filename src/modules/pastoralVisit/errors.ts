import { RecordState } from "../../types/types";

export default {
  reeceTime: {
    afterVisitTime: "reeceTime must be before visitTime",
  },
  visitTime: {
    beforeReeceTime: "visitTime must be after reeceTime",
  },
};
