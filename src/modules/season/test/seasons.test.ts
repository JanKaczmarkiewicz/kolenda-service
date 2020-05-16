import { gql } from "apollo-server";
import { setup } from "../../../testUtils/beforeAllSetup";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { query } from "../../../testUtils/query";
import Season from "../../../models/Season";
import { dummySeasonData, badToken } from "../../../testUtils/dummyData";
import { SeasonDbObject } from "../../../types/types";
import { SeasonFragment } from "../../../testUtils/fragments";
import { responceError } from "../../../errors/responce";
import * as mongoose from "mongoose";

let token: string;
let season: SeasonDbObject;

const SEASONS = gql`
  query {
    seasons {
      ...SeasonFragment
    }
  }
  ${SeasonFragment}
`;

afterAll(async () => {
  await mongoose.disconnect();
});
beforeAll(async () => {
  await setup();
  token = await signUser();
  season = await new Season(dummySeasonData).save();
});

describe("Seasons (multiple)", () => {
  it("Authenticated user can get multiple seasons", async () => {
    const res = await query({ query: SEASONS }, token);
    expect(res.data?.seasons).toHaveLength(1);

    expect(res.data?.seasons[0]).toEqual({
      id: season._id.toHexString(),
      year: season.year,
    });
  });

  it("Unauthenticated user can not get multiple seasons.", async () => {
    const res = await query({ query: SEASONS }, badToken);

    expect(res.data?.seasons).toBeFalsy();
    expect(res.errors?.[0].message).toBe(responceError.authenticationFailed);
  });
});
