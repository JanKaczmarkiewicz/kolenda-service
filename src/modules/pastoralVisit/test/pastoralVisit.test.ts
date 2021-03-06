import { setup } from "../../../testUtils/beforeAllSetup";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { addPastralVisit } from "../../../testUtils/mock/mockPastoralVisit";
import { query } from "../../../testUtils/query";
import { gql } from "apollo-server";
import { badToken } from "../../../testUtils/dummyData";
import { responceError } from "../../../errors/responce";
import { PastoralVisitFragment } from "../../../testUtils/fragments";
import { PastoralVisitDbObject, FindOneInput } from "../../../types/types";
import * as mongoose from "mongoose";

let token: string;
let pastoralVisit: PastoralVisitDbObject;

const PASTORAL_VISIT = gql`
  query pastoralVisit($input: FindOneInput!) {
    pastoralVisit(input: $input) {
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

describe("pastoralVisit", () => {
  it("Authenticated user can query pastoralVisit", async () => {
    const input: FindOneInput = {
      id: pastoralVisit._id.toHexString(),
    };
    const res = await query(
      {
        query: PASTORAL_VISIT,
        input,
      },
      token
    );

    expect(res.data?.pastoralVisit).toEqual({
      id: pastoralVisit._id.toHexString(),
      priest: {
        id: pastoralVisit.priest?.toHexString(),
      },
      acolytes: expect.arrayContaining(
        pastoralVisit.acolytes.map((_id) => ({ id: _id.toHexString() }))
      ),
      day: {
        id: pastoralVisit.day?.toHexString(),
      },
    });
  });

  it("Unauthenticated user can not query pastoralVisit.", async () => {
    const input: FindOneInput = {
      id: pastoralVisit._id.toHexString(),
    };

    const res = await query(
      {
        query: PASTORAL_VISIT,
        input,
      },
      badToken
    );

    expect(res.data?.pastoralVisit).toBeFalsy();
    expect(res.errors?.[0].message).toBe(responceError.authenticationFailed);
  });
});
