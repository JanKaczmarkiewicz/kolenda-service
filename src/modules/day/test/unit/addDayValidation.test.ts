import { addDaySchema } from "../../validators";
import { SeasonDbObject, AddDayInput } from "../../../../types/types";
import { mockDbBeforeAddingDay } from "../../../../testUtils/mock/mockDay";
import { setup } from "../../../../testUtils/beforeAllSetup";
import errors from "../../errors";
import commonErrors from "../../../shered/errors";
import { createValidationTest } from "../../../../testUtils/validationTest";
import * as mongoose from "mongoose";

const validationTest = createValidationTest(addDaySchema);

let season: SeasonDbObject;

afterAll(async () => {
  await mongoose.disconnect();
});
beforeAll(async () => {
  await setup();
  const mock = await mockDbBeforeAddingDay();
  season = mock.season;
});

describe("field: ", () => {
  it("validated", async () => {
    const input: AddDayInput = {
      season: "sda",
      reeceDate: new Date(Date.now() - 50000).toISOString(),
      visitDate: new Date(Date.now() - 30000).toISOString(),
    };

    await validationTest(input, [
      { message: commonErrors.futureDate.beforeNow, path: "reeceDate" },
      { message: commonErrors.futureDate.beforeNow, path: "visitDate" },
      { message: commonErrors.id.invalid, path: "season" },
    ]);
  });

  it("dependent dates check", async () => {
    const input: AddDayInput = {
      season: season._id.toHexString(),
      reeceDate: new Date(Date.now() + 50000).toISOString(),
      visitDate: new Date(Date.now() + 30000).toISOString(),
    };
    await validationTest(input, [
      { message: errors.reeceDate.afterVisitDate, path: "reeceDate" },
      { message: errors.visitDate.beforeReeceDate, path: "visitDate" },
    ]);
  });

  it("one date", async () => {
    const input: Partial<AddDayInput> = {
      season: season._id.toHexString(),
      visitDate: new Date(Date.now() + 30000).toISOString(),
    };
    await validationTest(input, [
      { message: commonErrors.any.required, path: "reeceDate" },
    ]);
  });

  it("required", async () => {
    const input = {};
    await validationTest(input, [
      { message: commonErrors.any.required, path: "reeceDate" },
      { message: commonErrors.any.required, path: "visitDate" },
      { message: commonErrors.any.required, path: "season" },
    ]);
  });

  it("correct input pass", async () => {
    const input: AddDayInput = {
      season: season._id.toHexString(),
      reeceDate: new Date(Date.now() - 50000).toISOString(),
      visitDate: new Date(Date.now() - 30000).toISOString(),
    };
    await validationTest(input, []);
  });
});
