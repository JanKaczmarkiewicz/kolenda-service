import * as yup from "yup";
import errors from "./errors";
import { isHouseStreetInAssignedStreets } from "../../utils/isHouseStreetInAssignedStreetsValidationHelper";
import { id } from "../shered/validationTypes";

const house = yup
  .string()
  .test(
    "isHousesStreetInAssignedStreets",
    errors.house.allowedStreet,
    function (houseId: string | undefined) {
      const pastoralVisitId = this.parent?.pastoralVisit;
      if (!pastoralVisitId || !houseId) return true;
      return isHouseStreetInAssignedStreets(houseId, pastoralVisitId);
    }
  );
export const addEntranceValidation = yup.object().shape({
  house: house.required(),
  pastoralVisit: yup.string().required(),
});

export const updateEntranceValidation = yup.object().shape({
  id: id.required(),
  house,
  pastoralVisit: id,
});
