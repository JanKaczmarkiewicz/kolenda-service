import { ME } from "../../testUtils/queries";
import { query } from "../../testUtils/query";
import { signUser } from "../../testUtils/mock/mockAuth";
import { setup } from "../../testUtils/beforeAllSetup";
import { dummyUserData } from "../../testUtils/dummyData";
import { responceError } from "../../errors/responce";

let token: string;

beforeAll(async () => {
  await setup();
  token = await signUser(dummyUserData);
});

describe("Me", () => {
  it("With valid token should returns user data.", async () => {
    const res = await query({ query: ME }, token);
    expect(res.data?.me.username).toBe(dummyUserData.username);
  });

  it("With invalid token result in null.", async () => {
    const res = await query({ query: ME });
    expect(res.data?.me).toBeFalsy();
    expect(res.errors?.[0].message).toBe(responceError.authenticationFailed);
  });
});
