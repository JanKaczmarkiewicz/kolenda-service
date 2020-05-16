import { setup } from "../../../testUtils/beforeAllSetup";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { query } from "../../../testUtils/query";
import { gql } from "apollo-server";
import { badToken } from "../../../testUtils/dummyData";
import { responceError } from "../../../errors/responce";
import { EntryFragment } from "../../../testUtils/fragments";
import { addEntry } from "../../../testUtils/mock/mockEntry";
import {
  EntryDbObject,
  RecordState,
  UpdateEntryInput,
} from "../../../types/types";
import * as mongoose from "mongoose";

let token: string;
let entry: EntryDbObject;

const UPDATE_ENTRY = gql`
  mutation updateEntry($input: UpdateEntryInput!) {
    updateEntry(input: $input) {
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
  const mock = await addEntry();
  entry = mock.entry;
});

describe("updateEntry", () => {
  it("Authenticated user can updateEntry", async () => {
    const input: UpdateEntryInput = {
      id: entry._id.toHexString(),
      reeceState: RecordState.Accepted,
      comment: "from 17",
    };

    const res = await query(
      {
        query: UPDATE_ENTRY,
        input,
      },
      token
    );

    expect(res.data?.updateEntry).toEqual({
      id: entry._id.toHexString(),
      house: {
        id: entry.house?.toHexString(),
      },
      comment: input.comment,
      visitState: entry.reeceState,
      reeceState: input.reeceState,
      pastoralVisit: {
        id: entry.pastoralVisit?.toHexString(),
      },
    });
  });

  it("Unauthenticated user can not updateEntry.", async () => {
    const input: UpdateEntryInput = {
      id: entry._id.toHexString(),
      reeceState: RecordState.Accepted,
      comment: "from 17",
    };

    const res = await query(
      {
        query: UPDATE_ENTRY,
        input,
      },
      badToken
    );

    expect(res.data?.updateEntry).toBeFalsy();
    expect(res.errors?.[0].message).toBe(responceError.authenticationFailed);
  });
});
