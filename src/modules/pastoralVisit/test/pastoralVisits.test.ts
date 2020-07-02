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
import PastoralVisit from "../../../models/PastoralVisit";

let token: string;
let pastoralVisit: PastoralVisitDbObject;

const PASTORAL_VISITS = gql`
  query pastoralVisits($input: PastoralVisitsInput!) {
    pastoralVisits(input: $input) {
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
        input: {},
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
      season: { id: pastoralVisit?.season?.toHexString() },
    });
  });

  it("User can query by day", async () => {
    const visitTime = new Date(Date.now());
    visitTime.setDate(visitTime.getDay() + 10);
    const reeceTime = new Date(Date.now());
    reeceTime.setDate(reeceTime.getDay() + 11);

    const futurePastoralVisit = await new PastoralVisit({
      priest: pastoralVisit.priest!.toHexString(),
      season: pastoralVisit.season!.toHexString(),
      acolytes: pastoralVisit.acolytes.map((acolyte) => acolyte.toHexString()),
      visitTime,
      reeceTime,
    }).save();

    const res = await query(
      {
        query: PASTORAL_VISITS,
        input: { date: reeceTime.toISOString() },
      },
      token
    );

    expect(res.data?.pastoralVisits?.[0].id).toBe(
      futurePastoralVisit._id.toHexString()
    );
  });

  it("Unauthenticated user can not pastoralVisits.", async () => {
    const res = await query(
      {
        query: PASTORAL_VISITS,
        input: {},
      },
      badToken
    );

    expect(res.data?.pastoralVisits).toBeFalsy();
    expect(res.errors?.[0].message).toBe(responceError.authenticationFailed);
  });
});
