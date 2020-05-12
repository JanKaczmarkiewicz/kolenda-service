import { registerSchema } from "../../validators";
import { RegisterInput } from "../../../../types/types";
import { setup } from "../../../../testUtils/beforeAllSetup";
import errors from "../../errors";
import commonErrors from "../../../shered/errors";
import { createValidationTest } from "../../../../testUtils/validationTest";
import { dummyUserData } from "../../../../testUtils/dummyData";

const validationTest = createValidationTest(registerSchema);

beforeAll(async () => {
  await setup();
});

describe("fields: ", () => {
  it("correct input pass", async () => {
    const input: RegisterInput = dummyUserData;

    await validationTest(input, []);
  });
  it("corredct input pass", async () => {
    const input: RegisterInput = {
      email: "sdasdasdasd",
      password: "short",
      username: ";[].;;2sd",
    };

    await validationTest(input, [
      { path: "email", message: errors.email.format },
      {
        path: "password",
        message: expect.stringContaining(errors.password.min.split("${")[0]),
      },
      { path: "username", message: errors.username.format },
    ]);
  });

  it("all fields are required", async () => {
    const input = {};

    await validationTest(input, [
      { path: "email", message: commonErrors.any.required },
      { path: "password", message: commonErrors.any.required },
      { path: "username", message: commonErrors.any.required },
    ]);
  });
});
