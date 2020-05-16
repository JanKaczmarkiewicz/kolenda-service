import { setup } from "../../../testUtils/beforeAllSetup";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { query } from "../../../testUtils/query";
import gql from "graphql-tag";
import { badToken } from "../../../testUtils/dummyData";
import { responceError } from "../../../errors/responce";
import { EntryFragment } from "../../../testUtils/fragments";
import {
  HouseDbObject,
  PastoralVisitDbObject,
  EntryDbObject,
  RecordState,
} from "../../../types/types";
import Entry from "../../../models/Entry";
import { mockDbBeforeAddingEntry } from "../../../testUtils/mock/mockEntry";
import * as mongoose from "mongoose";

let token: string;

let house: HouseDbObject;
let pastoralVisit: PastoralVisitDbObject;

const ADD_ENTRY = gql`
  mutation addEntry($input: AddEntryInput!) {
    addEntry(input: $input) {
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
  const mock = await mockDbBeforeAddingEntry();
  house = mock.house;
  pastoralVisit = mock.pastoralVisit;
});

describe("entry", () => {
  it("Authenticated user can addEntry", async () => {
    const input = {
      house: house._id.toHexString(),
      pastoralVisit: pastoralVisit._id.toHexString(),
      comment: "test comment",
    };
    const res = await query(
      {
        query: ADD_ENTRY,
        input,
      },
      token
    );

    const foundEntry = (await Entry.findOne({})) as EntryDbObject;

    expect(res.data?.addEntry).toEqual({
      id: foundEntry._id.toHexString(),
      house: {
        id: foundEntry.house?.toHexString(),
      },
      comment: foundEntry.comment,
      visitState: RecordState.Unknown,
      reeceState: RecordState.Unknown,
      pastoralVisit: {
        id: foundEntry.pastoralVisit?.toHexString(),
      },
    });
  });

  it("Unauthenticated user can not addEntry.", async () => {
    const input = {
      house: house._id.toHexString(),
      pastoralVisit: pastoralVisit._id.toHexString(),
      comment: "test comment",
    };

    const res = await query(
      {
        query: ADD_ENTRY,
        input,
      },
      badToken
    );

    expect(res.data?.addEntry).toBeFalsy();
    expect(res.errors?.[0].message).toBe(responceError.authenticationFailed);
  });
});
