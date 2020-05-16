import { setup } from "../../../testUtils/beforeAllSetup";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { query } from "../../../testUtils/query";
import { gql } from "apollo-server";
import { badToken } from "../../../testUtils/dummyData";
import { responceError } from "../../../errors/responce";
import { PastoralVisitFragment } from "../../../testUtils/fragments";
import { addPastralVisit } from "../../../testUtils/mock/mockPastoralVisit";
import { PastoralVisitDbObject } from "../../../types/types";
import * as mongoose from "mongoose";

let token: string;
let pastoralVisit: PastoralVisitDbObject;

const PASTORAL_VISITS = gql`
  query pastoralVisits {
    pastoralVisits {
      ...PastoralVisitFragment
    }
  }
  ${PastoralVisitFragment}
`;

afterAll(async () => {
  await mongoose.disconnect();
});
beforeAll(async () => {
  await setup();
  token = await signUser();
  pastoralVisit = (await addPastralVisit()).pastoralVisit;
});

describe("pastoralVisits", () => {
  it("Authenticated user can pastoralVisits", async () => {
    const res = await query(
      {
        query: PASTORAL_VISITS,
      },
      token
    );

    expect(res.data?.pastoralVisits?.[0]).toEqual({
      id: pastoralVisit._id.toHexString(),
      priest: {
        id: pastoralVisit.priest?.toHexString(),
      },
      acolytes: expect.arrayContaining(
        pastoralVisit.acolytes.map((_id) => ({ id: _id.toHexString() }))
      ),
      visitTime: pastoralVisit.visitTime.toISOString(),
      reeceTime: pastoralVisit.reeceTime.toISOString(),
      season: { id: pastoralVisit.season.toHexString() },
    });
  });

  it("Unauthenticated user can not pastoralVisits.", async () => {
    const res = await query(
      {
        query: PASTORAL_VISITS,
      },
      badToken
    );

    expect(res.data?.pastoralVisits).toBeFalsy();
    expect(res.errors?.[0].message).toBe(responceError.authenticationFailed);
  });
});
