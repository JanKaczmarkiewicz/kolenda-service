import {
  dummyUserData,
  dummySeasonData,
  dummyAcolytesData,
} from "../dummyData";
import User from "../../models/User";
import { Role } from "../../types/types";
import Season from "../../models/Season";
import PastoralVisit from "../../models/PastoralVisit";

export const addPastralVisit = async () => {
  const mock = await mockDbBeforeAddingPastralVisit();
  const pastoralVisit = await new PastoralVisit({
    priest: mock.priest._id.toHexString(),
    acolytes: mock.acolytes.map((acolyte) => acolyte._id.toHexString()),
    visitTime: new Date(),
    reeceTime: new Date(),
    season: mock.season._id.toHexString(),
  }).save();
  return { ...mock, pastoralVisit };
};

export const mockDbBeforeAddingPastralVisit = async () => {
  const priest = await new User({
    role: Role.Priest,
    confirmed: true,
    username: "Test Priest",
    password: "somepassowrd",
    email: "testPriest@gmail.com",
  }).save();

  const season = await new Season(dummySeasonData).save();

  const acolytes = await Promise.all(
    dummyAcolytesData.map((userData) =>
      new User({
        username: userData.username,
        password: userData.password,
        email: userData.email,
        confirmed: true,
        role: Role.Acolyte,
      }).save()
    )
  );

  return {
    acolytes,
    season,
    priest,
  };
};
