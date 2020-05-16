import gql from "graphql-tag";
import { setup } from "../../../testUtils/beforeAllSetup";
import { query } from "../../../testUtils/query";

import { responceError } from "../../../errors/responce";

import { signUser } from "../../../testUtils/mock/mockAuth";
import { StreetFragment } from "../../../testUtils/fragments";
import { badToken } from "../../../testUtils/dummyData";
import errors from "../errors";
import * as mongoose from "mongoose";

let token: string;
const streetName = "Miodowa";

const ADD_STREET = gql`
  mutation addStreet($input: AddStreetInput!) {
    addStreet(input: $input) {
      ...StreetFragment
    }
  }
  ${StreetFragment}
`;

afterAll(async () => {
  await mongoose.disconnect();
});
beforeAll(async () => {
  await setup();
  token = await signUser();
});

describe("addStreet resolver", () => {
  it("Should add street if data valid", async () => {
    const res = await query(
      {
        query: ADD_STREET,
        input: { name: streetName },
      },
      token
    );

    expect(res.data?.addStreet.name).toBe(streetName);
  });

  it("Connot add street with same name.", async () => {
    const res = await query(
      {
        query: ADD_STREET,
        input: { name: streetName },
      },
      token
    );
    expect(res.data?.addStreet).toBeFalsy();
    expect(res.errors?.[0].message).toBe(errors.street.exist);
  });

  it("User with no valid token/confirmed can't create street.", async () => {
    const res = await query(
      {
        query: ADD_STREET,
        input: { name: streetName + "_new" },
      },
      badToken
    );

    expect(res.data?.addStreet).toBeFalsy();
    expect(res.errors?.[0].message).toBe(responceError.authenticationFailed);
  });
});
