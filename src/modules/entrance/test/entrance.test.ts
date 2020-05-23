import { setup } from "../../../testUtils/beforeAllSetup";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { query } from "../../../testUtils/query";
import { gql } from "apollo-server";
import { badToken } from "../../../testUtils/dummyData";
import { responceError } from "../../../errors/responce";
import { EntranceFragment } from "../../../testUtils/fragments";
import { RecordState, EntranceDbObject } from "../../../types/types";
import * as mongoose from "mongoose";
import { addEntrance } from "../../../testUtils/mock/mockEntrance";

let token: string;
let savedEntrance: EntranceDbObject;

const ENTRENCE = gql`
  query Entrance($input: FindOneInput!) {
    entrance(input: $input) {
      ...EntranceFragment
    }
  }
  ${EntranceFragment}
`;

afterAll(async () => {
  await mongoose.disconnect();
});
beforeAll(async () => {
  await setup();
  token = await signUser();
  savedEntrance = (await addEntrance()).entrance;
});

describe("Entrance", () => {
  it("Authenticated user can query Entrance", async () => {
    const res = await query(
      {
        query: ENTRENCE,
        input: { id: savedEntrance._id.toHexString() },
      },
      token
    );

    expect(res.data?.entrance).toEqual({
      id: savedEntrance._id.toHexString(),
      house: {
        id: savedEntrance.house?.toHexString(),
      },
      comment: savedEntrance.comment,
      visitState: RecordState.Unknown,
      reeceState: RecordState.Unknown,
      pastoralVisit: {
        id: savedEntrance.pastoralVisit?.toHexString(),
      },
    });
  });

  it("Unauthenticated user can not query Entrance.", async () => {
    const res = await query(
      {
        query: ENTRENCE,
        input: { id: savedEntrance._id.toHexString() },
      },
      badToken
    );

    expect(res.data?.entrance).toBeFalsy();
    expect(res.errors?.[0].message).toBe(responceError.authenticationFailed);
  });
});
