import createDatabaseConnection from "../../db/connect";

import { removeAllCollections } from "../../testUtils/connectToMongoose";
import { dummyUser } from "../../testUtils/dummyUser";
import { query } from "../../testUtils/query";
import { symulateAuth } from "../../testUtils/mock/mockAuth";
import gql from "graphql-tag";

let token: string;

beforeAll(async () => {
  await createDatabaseConnection();
  await removeAllCollections();
  token = await symulateAuth(dummyUser)
    .register()
    .verifyEmail()
    .login()
    .execute();
});

const ADD_STREET = gql`
  mutation addStreet($name: String!) {
    addStreet(input: { name: $name }) {
      id
      name
    }
  }
`;

describe("Add street", () => {
  it("Should add street if data valid", async () => {
    const res = await query(
      {
        query: ADD_STREET,
        variables: {
          name: "Miodowa",
        },
      },
      token
    );

    expect(res.data?.addStreet).toBeTruthy();
  });

  it("Connot add street with same name.", async () => {
    const res = await query(
      {
        query: ADD_STREET,
        variables: {
          name: "Miodowa",
        },
      },
      token
    );

    expect(res.data?.addStreet).toBeFalsy();
  });

  it("User with no valid token/confirmed can't create street.", async () => {
    const res = await query(
      {
        query: ADD_STREET,
        variables: {
          name: "Miodowa2",
        },
      },
      "Bad token"
    );

    console.log(res);
    expect(res.data?.addStreet).toBeFalsy();
  });
});
