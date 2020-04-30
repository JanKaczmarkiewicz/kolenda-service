import { UserDbObject } from "../../../types/types";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { USER } from "../../../testUtils/queries";
import { badToken, dummyUserData } from "../../../testUtils/dummyData";
import { query } from "../../../testUtils/query";
import User from "../../../models/User";
import { setup } from "../../../testUtils/beforeAllSetup";
import { responceError } from "../../../errors/responce";

let token: string;
let savedUser: UserDbObject;

beforeAll(async () => {
  await setup();
  token = await signUser();
  savedUser = await new User(dummyUserData).save();
});

describe("User", () => {
  it("Authenticated user should have access to find user by id", async () => {
    const res = await query(
      { query: USER, variables: { id: savedUser._id.toHexString() } },
      token
    );
    const user = res.data?.user;

    expect(user.username).toBe(savedUser.username);
    expect(user.email).toBe(savedUser.email);
  });

  it("Invalid id argument results in null.", async () => {
    const res = await query({ query: USER, variables: { id: "badid" } }, token);
    expect(res.data?.user).toBeNull();
  });

  it("Inauthenticated user shouldn't have access to user data.", async () => {
    const res = await query(
      { query: USER, variables: { id: savedUser._id.toHexString() } },
      badToken
    );
    expect(res.data?.user).toBeFalsy();
    expect(res.errors?.[0].message).toBe(responceError.authenticationFailed);
  });
});
