import { setup } from "../../../testUtils/beforeAllSetup";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { query } from "../../../testUtils/query";
import { gql } from "apollo-server";
import { badToken } from "../../../testUtils/dummyData";
import { responceError } from "../../../errors/responce";
import { EntranceFragment } from "../../../testUtils/fragments";
import {
  HouseDbObject,
  PastoralVisitDbObject,
  EntranceDbObject,
  RecordState,
} from "../../../types/types";
import Entrance from "../../../models/Entrance";
import { mockDbBeforeAddingEntrance } from "../../../testUtils/mock/mockEntrance";
import * as mongoose from "mongoose";
import PastoralVisit from "../../../models/PastoralVisit";
import Day from "../../../models/Day";

let token: string;

let house: HouseDbObject;
let pastoralVisit: PastoralVisitDbObject;

const ADD_ENTRANCE = gql`
  mutation addEntrance($input: AddEntranceInput!) {
    addEntrance(input: $input) {
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
  const mock = await mockDbBeforeAddingEntrance();
  house = mock.house;
  pastoralVisit = mock.pastoralVisit;
});

describe("Entrance", () => {
  it("Authenticated user can addEntrance", async () => {
    const input = {
      house: house._id.toHexString(),
      pastoralVisit: pastoralVisit._id.toHexString(),
      comment: "test comment",
    };
    const streetId = house.street?.toHexString();

    const { day } = (await PastoralVisit.findOne({
      _id: input.pastoralVisit,
    }))!;

    await Day.findByIdAndUpdate(
      day,
      {
        $set: {
          assignedStreets: [streetId],
        },
      },
      { new: true }
    );

    const res = await query(
      {
        query: ADD_ENTRANCE,
        input,
      },
      token
    );

    const foundEntrance = (await Entrance.findOne({})) as EntranceDbObject;

    expect(res.data?.addEntrance).toEqual({
      id: foundEntrance._id.toHexString(),
      house: {
        id: foundEntrance.house?.toHexString(),
      },
      comment: foundEntrance.comment,
      visitState: RecordState.Unknown,
      reeceState: RecordState.Unknown,
      pastoralVisit: {
        id: foundEntrance.pastoralVisit?.toHexString(),
      },
    });
  });

  it("Unauthenticated user can not addEntrance.", async () => {
    const input = {
      house: house._id.toHexString(),
      pastoralVisit: pastoralVisit._id.toHexString(),
      comment: "test comment",
    };

    const res = await query(
      {
        query: ADD_ENTRANCE,
        input,
      },
      badToken
    );

    expect(res.data?.addEntrance).toBeFalsy();
    expect(res.errors?.[0].message).toBe(responceError.authenticationFailed);
  });
});
