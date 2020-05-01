import { setup } from "../../../testUtils/beforeAllSetup";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { query } from "../../../testUtils/query";
import gql from "graphql-tag";
import Season from "../../../models/Season";
import { SeasonDbObject } from "../../../types/types";
import { badToken, badId } from "../../../testUtils/dummyData";
import { responceError } from "../../../errors/responce";
import { SeasonFragment } from "../../../testUtils/fragments";

let token: string;
let season: SeasonDbObject;

const SEASON = gql`
  query season($id: String!) {
    season(input: { id: $id }) {
      ...SeasonFragment
    }
  }
  ${SeasonFragment}
`;

beforeAll(async () => {
  await setup();
  token = await signUser();
  season = await new Season({ year: 2020 }).save();
});

describe("Season (single)", () => {
  it("Authenticated user can get season", async () => {
    const res = await query(
      {
        query: SEASON,
        variables: {
          id: season._id.toHexString(),
        },
      },
      token
    );

    expect(res.data?.season).toEqual({
      id: season._id.toHexString(),
      year: season.year,
    });
  });

  it("Wrong id paramet result null.", async () => {
    const res = await query(
      {
        query: SEASON,
        variables: {
          id: badId,
        },
      },
      token
    );

    expect(res.data?.season).toBeFalsy();
  });

  it("Unauthenticated user cannot get info about season.", async () => {
    const res = await query(
      {
        query: SEASON,
        variables: {
          id: season._id.toHexString(),
        },
      },
      badToken
    );

    expect(res.data?.season).toBeFalsy();
    expect(res.errors?.[0].message).toBe(responceError.authenticationFailed);
  });
});
