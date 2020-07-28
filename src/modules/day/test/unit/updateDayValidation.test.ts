import { updateDaySchema } from "../../validators";
import {
  UpdatePastoralVisitInput,
  PastoralVisitDbObject,
  UpdateDayInput,
  DayDbObject,
} from "../../../../types/types";
import { addPastralVisit } from "../../../../testUtils/mock/mockPastoralVisit";
import { setup } from "../../../../testUtils/beforeAllSetup";
import errors from "../../errors";
import commonErrors from "../../../shered/errors";
import { createValidationTest } from "../../../../testUtils/validationTest";
import * as mongoose from "mongoose";
import { addDay } from "../../../../testUtils/mock/mockDay";

const validationTest = createValidationTest(updateDaySchema);

let day: DayDbObject;

afterAll(async () => {
  await mongoose.disconnect();
});
beforeAll(async () => {
  await setup();
  day = (await addDay()).day;
});

describe("Id checks", () => {
  it("Bad id detection", async () => {
    const input: UpdatePastoralVisitInput = {
      id: "Asdasd",
    };

    await validationTest(input, [
      { path: "id", message: commonErrors.id.invalid },
    ]);
  });
  it("Good id should pass", async () => {
    const input: UpdatePastoralVisitInput = {
      id: day._id.toHexString(),
    };

    await validationTest(input, []);
  });
});

describe("all before now", () => {
  it("reeceDate before visitDate", async () => {
    const input: UpdateDayInput = {
      id: day._id.toHexString(),
      reeceDate: new Date(Date.now() - 50000).toISOString(),
      visitDate: new Date(Date.now() - 30000).toISOString(),
    };

    await validationTest(input, [
      {
        path: "reeceDate",
        message: commonErrors.futureDate.beforeNow,
      },
      {
        path: "visitDate",
        message: commonErrors.futureDate.beforeNow,
      },
    ]);
  });

  it("visitDate before reeceDate", async () => {
    const input: UpdateDayInput = {
      id: day._id.toHexString(),
      reeceDate: new Date(Date.now() - 300).toISOString(),
      visitDate: new Date(Date.now() - 500).toISOString(),
    };

    await validationTest(input, [
      {
        path: "reeceDate",
        message: errors.reeceDate.afterVisitDate,
      },
      {
        path: "reeceDate",
        message: commonErrors.futureDate.beforeNow,
      },
      {
        path: "visitDate",
        message: errors.visitDate.beforeReeceDate,
      },
      {
        path: "visitDate",
        message: commonErrors.futureDate.beforeNow,
      },
    ]);
  });
});

describe("before and after", () => {
  it("reeceDate before visitDate", async () => {
    const input: UpdateDayInput = {
      id: day._id.toHexString(),
      reeceDate: new Date(Date.now() - 50000).toISOString(),
      visitDate: new Date(Date.now() + 30000).toISOString(),
    };
    await validationTest(input, [
      {
        path: "reeceDate",
        message: commonErrors.futureDate.beforeNow,
      },
    ]);
  });

  it("visitDate before reeceDate", async () => {
    const input: UpdateDayInput = {
      id: day._id.toHexString(),
      reeceDate: new Date(Date.now() + 30000).toISOString(),
      visitDate: new Date(Date.now() - 50000).toISOString(),
    };

    await validationTest(input, [
      {
        path: "reeceDate",
        message: errors.reeceDate.afterVisitDate,
      },
      {
        path: "visitDate",
        message: commonErrors.futureDate.beforeNow,
      },
      {
        path: "visitDate",
        message: errors.visitDate.beforeReeceDate,
      },
    ]);
  });
});

describe("all after now", () => {
  it("reeceDate before visitDate", async () => {
    const input: UpdateDayInput = {
      id: day._id.toHexString(),
      reeceDate: new Date(Date.now() + 30000).toISOString(),
      visitDate: new Date(Date.now() + 50000).toISOString(),
    };
    await validationTest(input, []);
  });

  it("visitDate before reeceDate", async () => {
    const input: UpdateDayInput = {
      id: day._id.toHexString(),
      reeceDate: new Date(Date.now() + 50000).toISOString(),
      visitDate: new Date(Date.now() + 30000).toISOString(),
    };

    await validationTest(input, [
      {
        path: "reeceDate",
        message: errors.reeceDate.afterVisitDate,
      },
      {
        path: "visitDate",
        message: errors.visitDate.beforeReeceDate,
      },
    ]);
  });
});

describe("single date passed", () => {
  it("reeceDate before visitDate", async () => {
    const input: UpdateDayInput = {
      id: day._id.toHexString(),
      reeceDate: new Date(Date.now() + 30000).toISOString(),
    };
    await validationTest(input, []);
  });
});
