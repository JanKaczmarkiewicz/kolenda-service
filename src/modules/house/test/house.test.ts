import { setup } from "../../../testUtils/beforeAllSetup";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { query } from "../../../testUtils/query";
import { gql } from "apollo-server";
import { badToken, dummyStreetData } from "../../../testUtils/dummyData";
import { responceError } from "../../../errors/responce";
import { HouseFragment } from "../../../testUtils/fragments";
import House from "../../../models/House";
import { HouseDbObject, StreetDbObject } from "../../../types/types";
import Street from "../../../models/Street";
import * as mongoose from "mongoose";

let token: string;
let house: HouseDbObject;
let street: StreetDbObject;

const HOUSE = gql`
  query house($input: FindOneInput!) {
    house(input: $input) {
      ...HouseFragment
    }
  }
  ${HouseFragment}
`;

afterAll(async () => {
  await mongoose.disconnect();
});
beforeAll(async () => {
  await setup();
  token = await signUser();
  street = await new Street(dummyStreetData).save();
  house = await new House({ street: street._id, number: "3c" }).save();
});

describe("house", () => {
  it("Authenticated user can query for house", async () => {
    const res = await query(
      {
        query: HOUSE,
        input: { id: house._id.toHexString() },
      },
      token
    );

    expect(res.data?.house).toEqual({
      id: house._id.toHexString(),
      number: house.number,
      street: {
        id: street._id.toHexString(),
      },
    });
  });

  it("Unauthenticated user can not query for house.", async () => {
    const res = await query(
      {
        query: HOUSE,
        input: { id: house._id.toHexString() },
      },
      badToken
    );

    expect(res.data?.house).toBeFalsy();
    expect(res.errors?.[0].message).toBe(responceError.authenticationFailed);
  });
});
