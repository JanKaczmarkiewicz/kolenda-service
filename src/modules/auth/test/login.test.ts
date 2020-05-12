import { LOGIN } from "../../../testUtils/queries";
import { query } from "../../../testUtils/query";
import { symulateAuth } from "../../../testUtils/mock/mockAuth";
import { setup } from "../../../testUtils/beforeAllSetup";
import { dummyUserData } from "../../../testUtils/dummyData";
import { responceError } from "../../../errors/responce";

beforeAll(async () => {
  await setup();
  await symulateAuth(dummyUserData).register().verifyEmail().execute();
});

describe("Login", () => {
  it("should returns token if credensials valid", async () => {
    const res = await query({
      query: LOGIN,
      input: { email: dummyUserData.email, password: dummyUserData.password },
    });

    expect(res.data?.login).toBeTruthy();
  });

  it("should return null if there is no user with this email", async () => {
    const res = await query({
      query: LOGIN,
      input: {
        email: "bad_user_email@test.com",
        password: dummyUserData.password,
      },
    });

    expect(res.data?.login).toBeFalsy();
    expect(res.errors?.[0].message).toBe(responceError.invalidCredentials);
  });

  it("should return null if password invalid", async () => {
    const res = await query({
      query: LOGIN,
      input: {
        email: dummyUserData.email,
        password: "bad_user_password",
      },
    });
    expect(res.data?.login).toBeFalsy();
    expect(res.errors?.[0].message).toBe(responceError.invalidCredentials);
  });
});
