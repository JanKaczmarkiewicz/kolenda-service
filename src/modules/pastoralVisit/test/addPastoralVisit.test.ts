import { setup } from "../../../testUtils/beforeAllSetup";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { query } from "../../../testUtils/query";
import { gql } from "apollo-server";
import { PastoralVisitFragment } from "../../../testUtils/fragments";
import {
  AddPastoralVisitInput,
  UserDbObject,
  SeasonDbObject,
  DayDbObject,
} from "../../../types/types";
import { mockDbBeforeAddingPastralVisit } from "../../../testUtils/mock/mockPastoralVisit";
import PastoralVisit from "../../../models/PastoralVisit";
import { badToken } from "../../../testUtils/dummyData";
import { responceError } from "../../../errors/responce";
import * as mongoose from "mongoose";

let token: string;
let day: DayDbObject;
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

afterAll(async () => {
  await mongoose.disconnect();
});
beforeAll(async () => {
  await setup();
  token = await signUser();
  const mock = await mockDbBeforeAddingPastralVisit();
  day = mock.day;
  acolytes = mock.acolytes;
  priest = mock.priest;
  season = mock.season;
});

describe("addPastoralVisit", () => {
  it("Unauthenticated user can not addPastoralVisit", async () => {
    const input: AddPastoralVisitInput = {
      acolytes: acolytes.map(({ _id }) => _id.toHexString()),
      priest: priest._id.toHexString(),
      day: day._id.toHexString(),
      hour: "16:00",
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
      day: day._id.toHexString(),
      hour: "16:00",
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
      day: {
        id: foundPastoralVisit.day?.toHexString(),
      },
      acolytes: expect.arrayContaining(input.acolytes!.map((id) => ({ id }))),
    });
  });
});
