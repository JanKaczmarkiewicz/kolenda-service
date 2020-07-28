import { setup } from "../../../testUtils/beforeAllSetup";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { query } from "../../../testUtils/query";
import gql from "graphql-tag";
import { badToken } from "../../../testUtils/dummyData";
import { responceError } from "../../../errors/responce";
import { addEntrance } from "../../../testUtils/mock/mockEntrance";
import { EntranceDbObject } from "../../../types/types";

let token: string;
let entrance: EntranceDbObject;

const DELETE_ENTRANCE = gql`
  mutation deleteEntrance($input: DeleteOneInput!) {
    deleteEntrance(input: $input) {
      id
    }
  }
`;

beforeAll(async () => {
  await setup();
  token = await signUser();
  const mock = await addEntrance();
  entrance = mock.entrance;
});

describe("deleteEntrance", () => {
  it("Unauthenticated user can not deleteEntrance.", async () => {
    const res = await query(
      {
        query: DELETE_ENTRANCE,
        input: { id: entrance._id.toHexString() },
      },
      badToken
    );

    expect(res.data?.deleteEntrance).toBeFalsy();
    expect(res.errors?.[0].message).toBe(responceError.authenticationFailed);
  });

  it("Authenticated user can deleteEntrance", async () => {
    const res = await query(
      {
        query: DELETE_ENTRANCE,
        input: { id: entrance._id.toHexString() },
      },
      token
    );

    expect(res.data?.deleteEntrance.id).toEqual(entrance._id.toHexString());
  });
});
