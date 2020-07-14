import Street from "../../models/Street";
import { dummyStreetData, dummyUserData } from "../dummyData";
import House from "../../models/House";
import User from "../../models/User";
import { Role } from "../../types/types";
import Entrance from "../../models/Entrance";
import { addPastralVisit } from "./mockPastoralVisit";

export const addEntrance = async () => {
  const mock = await mockDbBeforeAddingEntrance();
  const entrance = await new Entrance({
    pastoralVisit: mock.pastoralVisit._id.toHexString(),
    house: mock.house._id.toHexString(),
    comment: "test_coment",
  }).save();
  return { ...mock, entrance };
};

export const mockDbBeforeAddingEntrance = async () => {
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
    ...(await addPastralVisit()),
  };
};
