import { UserDbObject, Role } from "../../../types/types";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { USERS } from "../../../testUtils/queries";
import { badToken, dummyUserData } from "../../../testUtils/dummyData";
import { query } from "../../../testUtils/query";
import { responceError } from "../../../errors/responce";
import User from "../../../models/User";
import { setup } from "../../../testUtils/beforeAllSetup";
import * as mongoose from "mongoose";

let token: string;
let savedUser: UserDbObject;
let priestUser: UserDbObject;

afterAll(async () => {
  await mongoose.disconnect();
});
beforeAll(async () => {
  await setup();
  token = await signUser();
  savedUser = await new User(dummyUserData).save();
  priestUser = await new User({
    username: "priest",
    role: Role.Priest,
    password: "somehashedpassword",
    confirmed: true,
    email: "somePriest@koleda.io",
  }).save();
});

describe("Users", () => {
  it("Authenticated user should have access to find multiple users", async () => {
    const res = await query({ query: USERS, input: {} }, token);
    expect(res.data?.users).toHaveLength(3);
  });
  it("Authenticated user should have access to find multiple users with one role", async () => {
    const res = await query(
      { query: USERS, input: { role: priestUser.role } },
      token
    );

    expect(res.data?.users).toHaveLength(1);
    expect(res.data?.users[0].role).toBe(priestUser.role);
  });
  it("Inauthenticated user shouldn't have access to list of users.", async () => {
    const res = await query({ query: USERS, input: {} }, badToken);
    expect(res.errors?.[0].message).toBe(responceError.authenticationFailed);
  });
});
