import { setup } from "../../../testUtils/beforeAllSetup";
import { mockDbBeforeAddingDay } from "../../../testUtils/mock/mockDay";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { SeasonDbObject, AddDayInput } from "../../../types/types";
import { validateArgs } from "../../../utils/validateArgs";
import { addDaySchema } from "../validators";
import Day from "../../../models/Day";
import { query } from "../../../testUtils/query";
import gql from "graphql-tag";
import { DayFragment } from "../../../testUtils/fragments";
import { badToken, dummyStreetData } from "../../../testUtils/dummyData";
import { mockServer } from "graphql-tools";
import { mockDbBeforeAddingPastralVisit } from "../../../testUtils/mock/mockPastoralVisit";
import { mockDbBeforeAddingEntrance } from "../../../testUtils/mock/mockEntrance";
import Street from "../../../models/Street";
import House from "../../../models/House";
import Entrance from "../../../models/Entrance";
import PastoralVisit from "../../../models/PastoralVisit";

let token: string;
let season: SeasonDbObject;

const ADD_DAY = gql`
  mutation AddDay($input: AddDayInput!) {
    addDay(input: $input) {
      ...DayFragment
    }
  }
  ${DayFragment}
`;

beforeAll(async () => {
  await setup();
  const mock = await mockDbBeforeAddingDay();
  token = await signUser();
  season = mock.season;
});

describe("Day addition", () => {
  it("Input is validated", async () => {
    const input: AddDayInput = {
      reeceDate: new Date(Date.now() + 9000).toISOString(),
      visitDate: new Date(Date.now() + 9000 * 2).toISOString(),
      season: season._id.toHexString(),
      assignedStreets: [],
    };

    const res = await query(
      {
        query: ADD_DAY,
        input,
      },
      token
    );

    const errors = await validateArgs(addDaySchema, input);

    expect(errors.length > 0).toBeTruthy();

    const foundDay = await Day.find({});
    expect(foundDay).toHaveLength(0);

    expect(res.data?.addDay).toBeFalsy();

    expect(res.errors?.[0].extensions?.validationErrors).toEqual(errors);
  });

  it("Unauthenticated user can not addDay", async () => {
    const input: AddDayInput = {
      reeceDate: new Date(Date.now() + 9000).toISOString(),
      visitDate: new Date(Date.now() + 9000 * 2).toISOString(),
      season: season._id.toHexString(),
      assignedStreets: [],
    };

    const res = await query(
      {
        query: ADD_DAY,
        input,
      },
      badToken
    );

    const foundDay = await Day.find({});
    expect(foundDay).toHaveLength(0);

    expect(res.data?.addDay).toBeFalsy();
  });

  it("Authenticated user can addDay", async () => {
    const input: AddDayInput = {
      reeceDate: new Date(Date.now() + 9000).toISOString(),
      visitDate: new Date(Date.now() + 9000 * 2).toISOString(),
      season: season._id.toHexString(),
      assignedStreets: [],
    };

    const res = await query(
      {
        query: ADD_DAY,
        input,
      },
      token
    );

    const day = res.data?.addPastoralVisit;

    expect(res.data?.addDay).toBe({
      id: day.id.toHexString(),
      season: day.season,
      reeceDate: input.reeceDate,
      visitDate: input.visitDate,
      unusedHouses: [],
    });
  });
});
