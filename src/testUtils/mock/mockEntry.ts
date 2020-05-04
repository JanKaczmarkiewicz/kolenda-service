import Street from "../../models/Street";
import { dummyStreetData, dummyUserData } from "../dummyData";
import House from "../../models/House";
import User from "../../models/User";
import { Role } from "../../types/types";
import Entry from "../../models/Entry";
import { addPastralVisit } from "./mockPastoralVisit";

export const addEntry = async () => {
  const mock = await mockDbBeforeAddingEntry();
  const entry = await new Entry({
    pastoralVisit: mock.pastoralVisit._id.toHexString(),
    house: mock.house._id.toHexString(),
    comment: "test_coment",
  }).save();
  return { ...mock, entry };
};

export const mockDbBeforeAddingEntry = async () => {
  const street = await new Street(dummyStreetData).save();

  const house = await new House({
    street: street._id.toHexString(),
    number: "32",
  }).save();

  const priest = await new User({
    role: Role.Priest,
    confirmed: true,
    ...dummyUserData,
  }).save();

  return {
    street,
    house,
    priest,
    ...(await addPastralVisit()),
  };
};
