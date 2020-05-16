import { gql } from "apollo-server";
import { StreetFragment } from "../../../testUtils/fragments";
import { StreetDbObject } from "../../../types/types";
import Street from "../../../models/Street";
import { query } from "../../../testUtils/query";
import { badToken } from "../../../testUtils/dummyData";
import { responceError } from "../../../errors/responce";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { setup } from "../../../testUtils/beforeAllSetup";
import * as mongoose from "mongoose";

let token: string;

afterAll(async () => {
  await mongoose.disconnect();
});
beforeAll(async () => {
  await setup();
  token = await signUser();
});

describe("street resolver (single element)", () => {
  const STREET = gql`
    query street($input: FindOneInput!) {
      street(input: $input) {
        ...StreetFragment
      }
    }
    ${StreetFragment}
  `;

  let street: StreetDbObject;

  afterAll(async () => {
    await mongoose.disconnect();
  });
  beforeAll(async () => {
    street = await new Street({ name: "Test single street" }).save();
  });

  it("Authentaced user can get info about street by id", async () => {
    const res = await query(
      {
        query: STREET,
        input: { id: street._id.toHexString() },
      },
      token
    );
    expect(res.data?.street.id).toBe(street._id.toHexString());
    expect(res.data?.street.name).toBe(street.name);
    expect(res.data?.street.houses).toHaveLength(0);
  });

  it("User can't find street if is unauthenticated.", async () => {
    const res = await query(
      {
        query: STREET,
        input: { id: street._id.toHexString() },
      },
      badToken
    );
    expect(res.data?.street).toBeFalsy();
    expect(res.errors?.[0].message).toBe(responceError.authenticationFailed);
  });
});
