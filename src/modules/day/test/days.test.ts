import { setup } from "../../../testUtils/beforeAllSetup";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { query } from "../../../testUtils/query";
import gql from "graphql-tag";
import { badToken } from "../../../testUtils/dummyData";
import { responceError } from "../../../errors/responce";
import { DayFragment } from "../../../testUtils/fragments";
import { DayDbObject } from "../../../types/types";
import Day from "../../../models/Day";
import Season from "../../../models/Season";

let token: string;

const DAYS = gql`
  query days($input: DaysInput!) {
    days(input: $input) {
      id
    }
  }
`;

beforeAll(async () => {
  await setup();
  token = await signUser();
});

describe("days", () => {
  it("Authenticated user can days", async () => {
    const daysData = {
      reeceDate: new Date(Date.now() + 5000),
      visitDate: new Date(Date.now() + 5000),
      assignedStreet: [],
    };

    const season1 = await new Season({ year: 2020 }).save();
    const day1 = await new Day({
      ...daysData,
      season: season1._id.toHexString(),
    }).save();

    const season2 = await new Season({ year: 2021 }).save();
    const day2 = await new Day({
      ...daysData,
      season: season2._id.toHexString(),
    }).save();

    const res = await query(
      {
        query: DAYS,
        input: { season: season1._id.toHexString() },
      },
      token
    );

    expect(res.data?.days).toEqual(
      expect.arrayContaining([
        {
          id: day1._id.toHexString(),
        },
      ])
    );
  });

  it("Unauthenticated user can not days.", async () => {
    const season3 = await new Season({ year: 2022 }).save();

    const res = await query(
      {
        query: DAYS,
        input: { season: season3._id.toHexString() },
      },
      badToken
    );

    expect(res.data?.days).toBeFalsy();
    expect(res.errors?.[0].message).toBe(responceError.authenticationFailed);
  });
});
