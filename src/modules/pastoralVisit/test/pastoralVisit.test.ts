import { setup } from "../../../testUtils/beforeAllSetup";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { addPastralVisit } from "../../../testUtils/mock/mockPastoralVisit";
import { query } from "../../../testUtils/query";
import gql from "graphql-tag";
import { badToken } from "../../../testUtils/dummyData";
import { responceError } from "../../../errors/responce";
import { PastoralVisitFragment } from "../../../testUtils/fragments";
import { PastoralVisitDbObject, FindOneInput } from "../../../types/types";

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
      visitTime: pastoralVisit.visitTime.toISOString(),
      reeceTime: pastoralVisit.reeceTime.toISOString(),
      season: { id: pastoralVisit.season.toHexString() },
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
