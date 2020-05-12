import { updatePastoralVisitSchema } from "../../validators";
import {
  UpdatePastoralVisitInput,
  PastoralVisitDbObject,
} from "../../../../types/types";
import { addPastralVisit } from "../../../../testUtils/mock/mockPastoralVisit";
import { setup } from "../../../../testUtils/beforeAllSetup";
import errors from "../../errors";
import sheredErrors from "../../../shered/errors";
import { createValidationTest } from "../../../../testUtils/validationTest";

const validationTest = createValidationTest(updatePastoralVisitSchema);
let pastoralVisit: PastoralVisitDbObject;

beforeAll(async () => {
  await setup();
  pastoralVisit = (await addPastralVisit()).pastoralVisit;
});

describe("Id checks", () => {
  it("Bad id detection", async () => {
    const input: UpdatePastoralVisitInput = {
      id: "Asdasd",
    };

    await validationTest(input, [
      { path: "id", message: sheredErrors.id.invalid },
    ]);
  });
  it("Good id should pass", async () => {
    const input: UpdatePastoralVisitInput = {
      id: pastoralVisit._id.toHexString(),
    };

    await validationTest(input, []);
  });
});

describe("all before now", () => {
  it("reeceTime before visitTime", async () => {
    const input: UpdatePastoralVisitInput = {
      id: pastoralVisit._id.toHexString(),
      reeceTime: new Date(Date.now() - 50000).toISOString(),
      visitTime: new Date(Date.now() - 30000).toISOString(),
    };

    await validationTest(input, [
      {
        path: "reeceTime",
        message: errors.reeceTime.beforeNow,
      },
      {
        path: "visitTime",
        message: errors.visitTime.beforeNow,
      },
    ]);
  });

  it("visitTime before reeceTime", async () => {
    const input: UpdatePastoralVisitInput = {
      id: pastoralVisit._id.toHexString(),
      reeceTime: new Date(Date.now() - 300).toISOString(),
      visitTime: new Date(Date.now() - 500).toISOString(),
    };

    await validationTest(input, [
      {
        path: "reeceTime",
        message: errors.reeceTime.afterVisitTime,
      },
      {
        path: "reeceTime",
        message: errors.reeceTime.beforeNow,
      },
      {
        path: "visitTime",
        message: errors.visitTime.beforeReeceTime,
      },
      {
        path: "visitTime",
        message: errors.visitTime.beforeNow,
      },
    ]);
  });
});

describe("before and after", () => {
  it("reeceTime before visitTime", async () => {
    const input: UpdatePastoralVisitInput = {
      id: pastoralVisit._id.toHexString(),
      reeceTime: new Date(Date.now() - 50000).toISOString(),
      visitTime: new Date(Date.now() + 30000).toISOString(),
    };
    await validationTest(input, [
      {
        path: "reeceTime",
        message: errors.reeceTime.beforeNow,
      },
    ]);
  });

  it("visitTime before reeceTime", async () => {
    const input: UpdatePastoralVisitInput = {
      id: pastoralVisit._id.toHexString(),
      reeceTime: new Date(Date.now() + 30000).toISOString(),
      visitTime: new Date(Date.now() - 50000).toISOString(),
    };

    await validationTest(input, [
      {
        path: "reeceTime",
        message: errors.reeceTime.afterVisitTime,
      },
      {
        path: "visitTime",
        message: errors.visitTime.beforeNow,
      },
      {
        path: "visitTime",
        message: errors.visitTime.beforeReeceTime,
      },
    ]);
  });
});

describe("all after now", () => {
  it("reeceTime before visitTime", async () => {
    const input: UpdatePastoralVisitInput = {
      id: pastoralVisit._id.toHexString(),
      reeceTime: new Date(Date.now() + 30000).toISOString(),
      visitTime: new Date(Date.now() + 50000).toISOString(),
    };
    await validationTest(input, []);
  });

  it("visitTime before reeceTime", async () => {
    const input: UpdatePastoralVisitInput = {
      id: pastoralVisit._id.toHexString(),
      reeceTime: new Date(Date.now() + 50000).toISOString(),
      visitTime: new Date(Date.now() + 30000).toISOString(),
    };

    await validationTest(input, [
      {
        path: "reeceTime",
        message: errors.reeceTime.afterVisitTime,
      },
      {
        path: "visitTime",
        message: errors.visitTime.beforeReeceTime,
      },
    ]);
  });
});
