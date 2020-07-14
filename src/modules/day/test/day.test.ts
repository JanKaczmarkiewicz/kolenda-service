import { setup } from "../../../testUtils/beforeAllSetup";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { query } from "../../../testUtils/query";
import gql from "graphql-tag";
import { badToken } from "../../../testUtils/dummyData";
import { responceError } from "../../../errors/responce";
import { DayFragment } from "../../../testUtils/fragments";
import { DayDbObject } from "../../../types/types";
import { addDay } from "../../../testUtils/mock/mockDay";

let token: string;
let day: DayDbObject;

const DAY = gql`
  query day($input: FindOneInput!) {
    day(input: $input) {
      ...DayFragment
    }
  }
  ${DayFragment}
`;

beforeAll(async () => {
  await setup();
  token = await signUser();
  const mock = await addDay();
  day = mock.day;
});

describe("day", () => {
  it("Authenticated user can day", async () => {
    const res = await query(
      {
        query: DAY,
        input: { id: day._id.toHexString() },
      },
      token
    );

    expect(res.data?.day).toEqual({
      id: day._id.toHexString(),
      season: { id: day.season?.toHexString() },
      visitDate: day.visitDate.toISOString(),
      reeceDate: day.reeceDate.toISOString(),
      unusedHouses: [],
      pastoralVisits: [],
    });
  });

  it("Unauthenticated user can not day.", async () => {
    const res = await query(
      {
        query: DAY,
        input: { id: day._id.toHexString() },
      },
      badToken
    );

    expect(res.data?.day).toBeFalsy();
    expect(res.errors?.[0].message).toBe(responceError.authenticationFailed);
  });
});
