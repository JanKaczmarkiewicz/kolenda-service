import { setup } from "../../../testUtils/beforeAllSetup";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { query } from "../../../testUtils/query";
import gql from "graphql-tag";
import { PastoralVisitFragment } from "../../../testUtils/fragments";
import {
  AddPastoralVisitInput,
  UserDbObject,
  SeasonDbObject,
} from "../../../types/types";
import { mockDbBeforeAddingPastralVisit } from "../../../testUtils/mock/mockPastoralVisit";
import PastoralVisit from "../../../models/PastoralVisit";
import { badToken } from "../../../testUtils/dummyData";
import { responceError } from "../../../errors/responce";
import { validateArgs, ValidationError } from "../../../utils/validateArgs";
import { addPastoralVisitSchema } from "../validators";

let token: string;

let acolytes: UserDbObject[];
let priest: UserDbObject;
let season: SeasonDbObject;

const ADD_PASTORAL_VISIT = gql`
  mutation addPastoralVisit($input: AddPastoralVisitInput!) {
    addPastoralVisit(input: $input) {
      ...PastoralVisitFragment
    }
  }
  ${PastoralVisitFragment}
`;

beforeAll(async () => {
  await setup();
  token = await signUser();
  const mock = await mockDbBeforeAddingPastralVisit();
  acolytes = mock.acolytes;
  priest = mock.priest;
  season = mock.season;
});

describe("addPastoralVisit", () => {
  it("Input is validated", async () => {
    const input: AddPastoralVisitInput = {
      acolytes: acolytes.map(({ _id }) => _id.toHexString()),
      priest: priest._id.toHexString(),
      visitTime: new Date(Date.now() - 1000).toISOString(),
      reeceTime: new Date(Date.now()).toISOString(),
      season: season._id.toHexString(),
    };

    const res = await query(
      {
        query: ADD_PASTORAL_VISIT,
        input,
      },
      token
    );

    const errors = await validateArgs(addPastoralVisitSchema, input);

    expect(errors.length > 0).toBeTruthy();

    const foundPastoralVisits = await PastoralVisit.find({});
    expect(foundPastoralVisits).toHaveLength(0);

    expect(res.data?.addPastoralVisit).toBeFalsy();

    expect(res.errors?.[0].extensions?.validationErrors).toEqual(errors);
  });

  it("Unauthenticated user can not addPastoralVisit.ts.", async () => {
    const input: AddPastoralVisitInput = {
      acolytes: acolytes.map(({ _id }) => _id.toHexString()),
      priest: priest._id.toHexString(),
      visitTime: new Date(Date.now() + 30000).toISOString(),
      reeceTime: new Date(Date.now() + 10000).toISOString(),
      season: season._id.toHexString(),
    };
    const res = await query(
      {
        query: ADD_PASTORAL_VISIT,
        input,
      },
      badToken
    );

    expect(res.data?.addPastoralVisit).toBeFalsy();
    expect(res.errors?.[0].message).toBe(responceError.authenticationFailed);
  });
  it("Authenticated user can addPastoralVisit", async () => {
    const input: AddPastoralVisitInput = {
      acolytes: acolytes.map(({ _id }) => _id.toHexString()),
      priest: priest._id.toHexString(),
      visitTime: new Date(Date.now() + 30000).toISOString(),
      reeceTime: new Date(Date.now() + 10000).toISOString(),
      season: season._id.toHexString(),
    };

    const res = await query(
      {
        query: ADD_PASTORAL_VISIT,
        input,
      },
      token
    );

    const foundPastoralVisit = (await PastoralVisit.findOne({}))!;

    expect(res.data?.addPastoralVisit).toEqual({
      id: foundPastoralVisit._id.toHexString(),
      priest: {
        id: input.priest,
      },
      acolytes: expect.arrayContaining(input.acolytes.map((id) => ({ id }))),
      visitTime: input.visitTime,
      reeceTime: input.reeceTime,
      season: { id: input.season },
    });
  });
});
