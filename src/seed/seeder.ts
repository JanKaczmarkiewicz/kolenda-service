import Season from "../models/Season";

import { setup } from "../testUtils/beforeAllSetup";
import loadEnv from "../utils/loadEnv";
import { createStreetsAndHouses } from "./_housesAndStreets";
import { createUsers } from "./_users";
import { createPastoralVisits } from "./_pastoralVisits";
import { createEntrances, getKeys } from "./_entrances";
import * as mongoose from "mongoose";

loadEnv();

(async () => {
  await setup();

  const [users, season, streets] = await Promise.all([
    createUsers(),
    new Season({ year: 2020 }).save(),
    createStreetsAndHouses(),
  ]);

  const { pastoralVisits, days } = await createPastoralVisits(
    season,
    users,
    getKeys(streets) as string[]
  );

  const entrances = await createEntrances(streets, pastoralVisits);

  mongoose.disconnect();
})();
