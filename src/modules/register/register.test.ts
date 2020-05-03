import { REGISTER } from "../../testUtils/queries";
import { query } from "../../testUtils/query";
import User from "../../models/User";
import { setup } from "../../testUtils/beforeAllSetup";
import { dummyUserData } from "../../testUtils/dummyData";
import { responceError } from "../../errors/responce";
import { Role } from "../../types/types";

beforeAll(async () => {
  await setup();
});

describe("Register", () => {
  it("Response should returns token", async () => {
    const res = await query({
      query: REGISTER,
      input: dummyUserData,
    });

    const token = res.data?.register;
    expect(token).toBeTruthy();

    const foundUsers = await User.find({ email: dummyUserData.email });

    expect(foundUsers).toHaveLength(1);
    const foundUser = foundUsers[0];
    expect(foundUser.username).toBe(dummyUserData.username);
    expect(foundUser.password).not.toBe(dummyUserData.password);
    expect(foundUser.email).toBe(dummyUserData.email);
    expect(foundUser.role).toBe(Role.User);
  });

  it("Same user cannot be registered twice.", async () => {
    const res = await query({
      query: REGISTER,
      input: dummyUserData,
    });
    expect(res.data?.register).toBeFalsy();
    expect(res.errors?.[0].message).toBe(responceError.userExists);
  });
});
