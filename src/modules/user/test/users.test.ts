import { UserDbObject } from "../../../types/types";
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

afterAll(async () => {
  await mongoose.disconnect();
});
beforeAll(async () => {
  await setup();
  token = await signUser();
  savedUser = await new User(dummyUserData).save();
});

describe("Users", () => {
  it("Authenticated user should have access to find multiple users", async () => {
    const res = await query({ query: USERS }, token);
    expect(res.data?.users).toHaveLength(2);
  });
  it("Inauthenticated user shouldn't have access to list of users.", async () => {
    const res = await query({ query: USERS }, badToken);
    expect(res.errors?.[0].message).toBe(responceError.authenticationFailed);
  });
});
