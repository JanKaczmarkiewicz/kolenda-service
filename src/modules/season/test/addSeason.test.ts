import { gql } from "apollo-server";
import { setup } from "../../../testUtils/beforeAllSetup";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { query } from "../../../testUtils/query";
import { SeasonFragment } from "../../../testUtils/fragments";
import Season from "../../../models/Season";
import { SeasonDbObject } from "../../../types/types";
import { badToken } from "../../../testUtils/dummyData";
import errors from "../errors";
import * as mongoose from "mongoose";

let token: string;

const ADD_SEASON = gql`
  mutation addSeason($input: AddSeasonInput!) {
    addSeason(input: $input) {
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
});

describe("Add season", () => {
  it("Authenticated user can create a season.", async () => {
    const seasonInput = { year: 2011 };
    const res = await query({ query: ADD_SEASON, input: seasonInput }, token);

    const foundSeason = (await Season.findOne({
      _id: res.data?.addSeason.id,
    })) as SeasonDbObject;

    expect(res.data?.addSeason).toEqual({
      year: foundSeason.year,
      id: foundSeason._id.toHexString(),
    });
  });

  it("User cannot add season with existing unique.", async () => {
    const seasonInput = { year: 2011 };
    const res = await query({ query: ADD_SEASON, input: seasonInput }, token);

    expect(res.errors?.[0].message).toBe(errors.season.exist);
  });

  it("Bad year format results validation error.", async () => {
    const seasonInput = { year: 22000 };

    const res = await query({ query: ADD_SEASON, input: seasonInput }, token);

    expect(res.data?.addSeason).toBeFalsy();

    const foundSeason = (await Season.findOne({
      year: seasonInput.year,
    })) as SeasonDbObject;

    expect(foundSeason).toBeFalsy();
  });

  it("Unauthenticated user can not create a season.", async () => {
    const seasonInput = { year: 2011 + 1 };

    const res = await query(
      { query: ADD_SEASON, input: seasonInput },
      badToken
    );
    expect(res.data?.addSeason).toBeFalsy();

    const foundSeason = (await Season.findOne({
      year: seasonInput.year,
    })) as SeasonDbObject;

    expect(foundSeason).toBeFalsy();
  });
});
