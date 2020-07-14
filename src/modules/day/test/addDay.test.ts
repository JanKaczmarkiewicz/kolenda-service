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

  const foundPastoralVisits = await Day.find({});
  expect(foundPastoralVisits).toHaveLength(0);

  expect(res.data?.addPastoralVisit).toBeFalsy();

  expect(res.errors?.[0].extensions?.validationErrors).toEqual(errors);
});
