import { setup } from "../../../testUtils/beforeAllSetup";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { query } from "../../../testUtils/query";
import gql from "graphql-tag";
import { PastoralVisitFragment } from "../../../testUtils/fragments";
import {
  AddPastoralVisitInput,
  UserDbObject,
  SeasonDbObject,
  PastoralVisitDbObject,
} from "../../../types/types";
import { mockDbBeforeAddingPastralVisit } from "../../../testUtils/mock/mockPastoralVisit";
import PastoralVisit from "../../../models/PastoralVisit";
import { badToken } from "../../../testUtils/dummyData";
import { responceError } from "../../../errors/responce";

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

describe("addPastoralVisit.ts", () => {
  it("Authenticated user can addPastoralVisit", async () => {
    const input: AddPastoralVisitInput = {
      acolytes: acolytes.map(({ _id }) => _id.toHexString()),
      priest: priest._id.toHexString(),
      visitTime: new Date().toISOString(),
      reeceTime: new Date().toISOString(),
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

  it("Unauthenticated user can not addPastoralVisit.ts.", async () => {
    const input: AddPastoralVisitInput = {
      acolytes: acolytes.map(({ _id }) => _id.toHexString()),
      priest: priest._id.toHexString(),
      visitTime: new Date().toISOString(),
      reeceTime: new Date().toISOString(),
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
});
