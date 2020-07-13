import { setup } from "../../../testUtils/beforeAllSetup";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { query } from "../../../testUtils/query";
import gql from "graphql-tag";
import {
  badToken,
  dummyStreetData,
  dummySeasonData,
} from "../../../testUtils/dummyData";
import { responceError } from "../../../errors/responce";
import { HouseFragment } from "../../../testUtils/fragments";
import * as mongoose from "mongoose";
import {
  StreetDbObject,
  SeasonDbObject,
  EntranceDbObject,
  HouseDbObject,
} from "../../../types/types";
import { addEntrance } from "../../../testUtils/mock/mockEntrance";
import House from "../../../models/House";

let token: string;
let street: StreetDbObject;
let season: SeasonDbObject;
let entrance: EntranceDbObject;
let house: HouseDbObject;
let houseAssignedToEntrance: HouseDbObject;

const FIND_UNUSED = gql`
  query findUnused($input: FindUnusedInput!) {
    findUnused(input: $input) {
      ...HouseFragment
    }
  }
  ${HouseFragment}
`;

beforeAll(async () => {
  await setup();
  const mock = await addEntrance();
  token = await signUser();
  street = mock.street;
  house = await new House({ number: "232c", street: street._id }).save();
  houseAssignedToEntrance = mock.house;
  season = mock.season;
  entrance = mock.entrance;
});

describe("findUnused", () => {
  it("Authenticated user can findUnused", async () => {
    const res = await query(
      {
        query: FIND_UNUSED,
        input: {
          streets: [street._id.toHexString()],
          season: season._id.toHexString(),
        },
      },
      token
    );

    expect(res.data?.findUnused).toEqual([
      {
        id: house._id.toHexString(),
        number: house.number,
        street: { id: house.street?.toHexString() },
      },
    ]);
  });

  it("Unauthenticated user can not findUnused.", async () => {
    const res = await query(
      {
        query: FIND_UNUSED,
        input: {
          streets: [street._id.toHexString()],
          season: season._id.toHexString(),
        },
      },
      badToken
    );

    expect(res.data?.findUnused).toBeFalsy();
    expect(res.errors?.[0].message).toBe(responceError.authenticationFailed);
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});
