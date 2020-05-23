import { setup } from "../../../testUtils/beforeAllSetup";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { query } from "../../../testUtils/query";
import { gql } from "apollo-server";
import { badToken } from "../../../testUtils/dummyData";
import { responceError } from "../../../errors/responce";
import { EntranceFragment } from "../../../testUtils/fragments";
import { addEntrance } from "../../../testUtils/mock/mockEntrance";
import {
  EntranceDbObject,
  RecordState,
  UpdateEntranceInput,
} from "../../../types/types";
import * as mongoose from "mongoose";

let token: string;
let entrance: EntranceDbObject;

const UPDATE_ENTRENCE = gql`
  mutation updateEntrance($input: UpdateEntranceInput!) {
    updateEntrance(input: $input) {
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
  const mock = await addEntrance();
  entrance = mock.entrance;
});

describe("updateEntrance", () => {
  it("Authenticated user can updateEntrance", async () => {
    const input: UpdateEntranceInput = {
      id: entrance._id.toHexString(),
      reeceState: RecordState.Accepted,
      comment: "from 17",
    };

    const res = await query(
      {
        query: UPDATE_ENTRENCE,
        input,
      },
      token
    );

    expect(res.data?.updateEntrance).toEqual({
      id: entrance._id.toHexString(),
      house: {
        id: entrance.house?.toHexString(),
      },
      comment: input.comment,
      visitState: entrance.reeceState,
      reeceState: input.reeceState,
      pastoralVisit: {
        id: entrance.pastoralVisit?.toHexString(),
      },
    });
  });

  it("Unauthenticated user can not updateEntrance.", async () => {
    const input: UpdateEntranceInput = {
      id: entrance._id.toHexString(),
      reeceState: RecordState.Accepted,
      comment: "from 17",
    };

    const res = await query(
      {
        query: UPDATE_ENTRENCE,
        input,
      },
      badToken
    );

    expect(res.data?.updateEntrance).toBeFalsy();
    expect(res.errors?.[0].message).toBe(responceError.authenticationFailed);
  });
});
