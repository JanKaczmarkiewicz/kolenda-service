import { TestContext } from "yup";
import House from "../models/House";
import PastoralVisit from "../models/PastoralVisit";
import { DayDbObject } from "../types/types";

export const isHouseStreetInAssignedStreets = async (
  houseId: string,
  pastoralVisitId: string
) => {
  const foundHouse = await House.findOne({ _id: houseId });

  if (!foundHouse) return false;

  const streetId = foundHouse.street;

  if (!streetId) return false;

  const foundPastoralVisit = await PastoralVisit.findOne({
    _id: pastoralVisitId,
  })
    .populate({
      path: "day",
      model: "Day",
    })
    .exec();

  if (!foundPastoralVisit) return false;

  const {
    assignedStreets,
  } = (foundPastoralVisit.day as unknown) as DayDbObject;

  const assignedStreetsAsStrings = assignedStreets.map((id) =>
    id.toHexString()
  );

  const streetIdAsString = streetId.toHexString();

  const isStreetInAssignedStreets =
    assignedStreetsAsStrings.findIndex((id) => id === streetIdAsString) >= 0;

  return isStreetInAssignedStreets;
};
