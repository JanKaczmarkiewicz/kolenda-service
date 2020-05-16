import { addPastoralVisitSchema } from "../../validators";
import {
  AddPastoralVisitInput,
  UserDbObject,
  SeasonDbObject,
} from "../../../../types/types";
import { mockDbBeforeAddingPastralVisit } from "../../../../testUtils/mock/mockPastoralVisit";
import { setup } from "../../../../testUtils/beforeAllSetup";
import errors from "../../errors";
import commonErrors from "../../../shered/errors";
import { createValidationTest } from "../../../../testUtils/validationTest";
import * as mongoose from "mongoose";

const validationTest = createValidationTest(addPastoralVisitSchema);

let acolytes: UserDbObject[];
let priest: UserDbObject;
let season: SeasonDbObject;

afterAll(async () => {
  await mongoose.disconnect();
});
beforeAll(async () => {
  await setup();
  const mock = await mockDbBeforeAddingPastralVisit();
  acolytes = mock.acolytes;
  priest = mock.priest;
  season = mock.season;
});

describe("field :", () => {
  it("validated", async () => {
    const input: AddPastoralVisitInput = {
      acolytes: ["asdasd", "12513513624434"],
      priest: "CSd",
      season: "sda",
      reeceTime: new Date(Date.now() - 50000).toISOString(),
      visitTime: new Date(Date.now() - 30000).toISOString(),
    };

    await validationTest(input, [
      { message: commonErrors.futureDate.beforeNow, path: "reeceTime" },
      { message: commonErrors.futureDate.beforeNow, path: "visitTime" },
      { message: commonErrors.id.invalid, path: "priest" },
      { message: commonErrors.id.invalid, path: "acolytes[0]" },
      { message: commonErrors.id.invalid, path: "acolytes[1]" },
      { message: commonErrors.id.invalid, path: "season" },
    ]);
  });

  it("dependent dates check", async () => {
    const input: AddPastoralVisitInput = {
      acolytes: acolytes.map((acolyte) => acolyte._id.toHexString()),
      priest: priest._id.toHexString(),
      season: season._id.toHexString(),
      reeceTime: new Date(Date.now() + 50000).toISOString(),
      visitTime: new Date(Date.now() + 30000).toISOString(),
    };

    await validationTest(input, [
      { message: errors.reeceTime.afterVisitTime, path: "reeceTime" },
      { message: errors.visitTime.beforeReeceTime, path: "visitTime" },
    ]);
  });

  it("one date", async () => {
    const input = {
      acolytes: acolytes.map((acolyte) => acolyte._id.toHexString()),
      priest: priest._id.toHexString(),
      season: season._id.toHexString(),
      visitTime: new Date(Date.now() + 30000).toISOString(),
    };

    await validationTest(input, [
      { message: commonErrors.any.required, path: "reeceTime" },
    ]);
  });

  it("required", async () => {
    const input = {};

    await validationTest(input, [
      { message: commonErrors.any.required, path: "reeceTime" },
      { message: commonErrors.any.required, path: "visitTime" },
      { message: commonErrors.any.required, path: "priest" },
      { message: commonErrors.any.required, path: "acolytes" },
      { message: commonErrors.any.required, path: "season" },
    ]);
  });

  it("correct input pass", async () => {
    const input: AddPastoralVisitInput = {
      acolytes: acolytes.map((acolyte) => acolyte._id.toHexString()),
      priest: priest._id.toHexString(),
      season: season._id.toHexString(),
      reeceTime: new Date(Date.now() - 50000).toISOString(),
      visitTime: new Date(Date.now() - 30000).toISOString(),
    };

    await validationTest(input, []);
  });
});
