import { setup } from "../../../testUtils/beforeAllSetup";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { query } from "../../../testUtils/query";
import gql from "graphql-tag";
import { badToken, dummyStreetData } from "../../../testUtils/dummyData";
import { responceError } from "../../../errors/responce";
import { HouseFragment } from "../../../testUtils/fragments";
import Street from "../../../models/Street";
import { StreetDbObject, HouseDbObject } from "../../../types/types";
import House from "../../../models/House";

let token: string;
let street: StreetDbObject;

const streetNumer = "2d";

const ADD_HOUSE = gql`
  mutation addHouse($input: AddHouseInput!) {
    addHouse(input: $input) {
      ...HouseFragment
    }
  }
  ${HouseFragment}
`;

beforeAll(async () => {
  await setup();
  token = await signUser();
  street = await new Street(dummyStreetData).save();
});

describe("addHouse", () => {
  it("Authenticated user can addHouse", async () => {
    const houseInput = {
      street: street._id.toHexString(),
      number: streetNumer,
    };
    const res = await query(
      {
        query: ADD_HOUSE,
        input: houseInput,
      },
      token
    );

    const foundHouse = (await House.findOne(houseInput)) as HouseDbObject;
    expect(foundHouse.street?.equals(houseInput.street)).toBeTruthy();
    expect(foundHouse.number).toBe(houseInput.number);

    expect(res.data?.addHouse).toEqual({
      id: foundHouse._id.toHexString(),
      number: houseInput.number,
      street: {
        id: foundHouse.street?.toHexString(),
      },
    });
  });

  it("Unauthenticated user can not addHouse.", async () => {
    const houseInput = {
      street: street._id.toHexString(),
      number: streetNumer,
    };
    const res = await query(
      {
        query: ADD_HOUSE,
        input: houseInput,
      },
      badToken
    );

    expect(res.data?.addHouse).toBeFalsy();
    expect(res.errors?.[0].message).toBe(responceError.authenticationFailed);
  });
});
