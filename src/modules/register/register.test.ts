import { REGISTER } from "../../testUtils/queries";
import { query } from "../../testUtils/query";
import User from "../../models/User";
import { setup } from "../../testUtils/beforeAllSetup";
import { dummyUserData } from "../../testUtils/dummyData";
import { responceError } from "../../errors/responce";
import { Role, RegisterInput } from "../../types/types";

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

  it("Validation works", async () => {
    const input: RegisterInput = {
      email: "esaas@wp.pl",
      password: "passwoe",
      username: "testuser123",
    };
    const res = await query({
      query: REGISTER,
      input,
    });

    expect(res.data?.register).toBeFalsy();
    const foundUsers = await User.find({ email: input.email });
    expect(foundUsers).toHaveLength(0);

    const errorObject = (res.errors as any)[0].extensions;
    expect(errorObject.code).toBe("BAD_USER_INPUT");

    expect(errorObject.validationErrors).toEqual([
      {
        name: "password",
        message: "Password is too short - should be 8 chars minimum.",
      },
    ]);
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
