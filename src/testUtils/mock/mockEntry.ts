import Street from "../../models/Street";
import {
  dummyStreetData,
  dummyUserData,
  dummySeasonData,
  dummyAcolytesData,
} from "../dummyData";
import House from "../../models/House";
import User from "../../models/User";
import { Role } from "../../types/types";
import Season from "../../models/Season";
import PastoralVisit from "../../models/PastoralVisit";

export default async () => {
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

  const pastoralVisit = await new PastoralVisit({
    priest: priest._id.toHexString(),
    acolytes: acolytes.map((acolyte) => acolyte._id.toHexString()),
    visitTime: new Date(),
    reeceTime: new Date(),
    season: season._id.toHexString(),
  }).save();

  return {
    pastoralVisit,
    acolytes,
    street,
    house,
    season,
    priest,
  };
};
