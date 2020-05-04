import createDatabaseConnection from "../../db/connect";
import { removeAllCollections } from "../../testUtils/connectToMongoose";
import { VERIFY_EMAIL } from "../../testUtils/queries";
import { dummyUserData } from "../../testUtils/dummyData";
import { query } from "../../testUtils/query";
import { symulateAuth } from "../../testUtils/mock/mockAuth";
import { authTokenToVerificationToken } from "../../utils/authTokenToVerificationToken";
import { setup } from "../../testUtils/beforeAllSetup";

let verificationToken: string;

beforeAll(async () => {
  await setup();

  const authToken = await symulateAuth(dummyUserData).register().execute();
  verificationToken = authTokenToVerificationToken(authToken);
});

describe("Login", () => {
  it("should returns true if verificationToken valid", async () => {
    const res = await query({
      query: VERIFY_EMAIL,
      input: { token: verificationToken },
    });

    expect(res.data?.verifyEmail).toBeTruthy();
  });

  it("should returns false if verificationToken invalid", async () => {
    const res = await query({
      query: VERIFY_EMAIL,
      input: { token: "Wrong token" },
    });

    expect(res.data?.verifyEmail).toBeFalsy();
  });

  it("should returns false if authToken is passed as verificationToken.", async () => {
    const authToken = await symulateAuth(dummyUserData).register().execute();
    const res = await query({
      query: VERIFY_EMAIL,
      input: {
        token: authToken,
      },
    });

    expect(res.data?.verifyEmail).toBeFalsy();
  });
});
