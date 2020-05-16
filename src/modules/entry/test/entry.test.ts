import { setup } from "../../../testUtils/beforeAllSetup";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { query } from "../../../testUtils/query";
import { gql } from "apollo-server";
import { badToken } from "../../../testUtils/dummyData";
import { responceError } from "../../../errors/responce";
import { EntryFragment } from "../../../testUtils/fragments";
import { RecordState, EntryDbObject } from "../../../types/types";
import * as mongoose from "mongoose";
import { addEntry } from "../../../testUtils/mock/mockEntry";

let token: string;
let savedEntry: EntryDbObject;

const ENTRY = gql`
  query entry($input: FindOneInput!) {
    entry(input: $input) {
      ...EntryFragment
    }
  }
  ${EntryFragment}
`;

afterAll(async () => {
  await mongoose.disconnect();
});
beforeAll(async () => {
  await setup();
  token = await signUser();
  savedEntry = (await addEntry()).entry;
});

describe("entry", () => {
  it("Authenticated user can query entry", async () => {
    const res = await query(
      {
        query: ENTRY,
        input: { id: savedEntry._id.toHexString() },
      },
      token
    );

    expect(res.data?.entry).toEqual({
      id: savedEntry._id.toHexString(),
      house: {
        id: savedEntry.house?.toHexString(),
      },
      comment: savedEntry.comment,
      visitState: RecordState.Unknown,
      reeceState: RecordState.Unknown,
      pastoralVisit: {
        id: savedEntry.pastoralVisit?.toHexString(),
      },
    });
  });

  it("Unauthenticated user can not query entry.", async () => {
    const res = await query(
      {
        query: ENTRY,
        input: { id: savedEntry._id.toHexString() },
      },
      badToken
    );

    expect(res.data?.entry).toBeFalsy();
    expect(res.errors?.[0].message).toBe(responceError.authenticationFailed);
  });
});
