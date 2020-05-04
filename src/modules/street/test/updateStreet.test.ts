import gql from "graphql-tag";
import { StreetFragment } from "../../../testUtils/fragments";
import { StreetDbObject } from "../../../types/types";
import Street from "../../../models/Street";
import { query } from "../../../testUtils/query";
import { badToken } from "../../../testUtils/dummyData";
import { responceError } from "../../../errors/responce";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { setup } from "../../../testUtils/beforeAllSetup";

let token: string;
let street: StreetDbObject;

const UPDATE_STREET = gql`
  mutation updateStreet($input: UpdateStreetInput!) {
    updateStreet(input: $input) {
      ...StreetFragment
    }
  }
  ${StreetFragment}
`;

beforeAll(async () => {
  await setup();
  street = await new Street({ name: "Test update single street" }).save();
  token = await signUser();
});

describe("Update Street", () => {
  it("Authentaced user can get update info about street", async () => {
    const newName = "update_street_pos";

    const res = await query(
      {
        query: UPDATE_STREET,
        input: { id: street._id.toHexString(), name: newName },
      },
      token
    );

    expect(res.data?.updateStreet.id).toBe(street._id.toHexString());
    expect(res.data?.updateStreet.name).toBe(newName);
  });

  it("User can't update street if is unauthenticated.", async () => {
    const newName = "update_street_neg";
    const res = await query(
      {
        query: UPDATE_STREET,
        input: { id: street._id.toHexString(), name: newName },
      },
      badToken
    );

    expect(res.data?.updateStreet).toBeFalsy();
    expect(res.errors?.[0].message).toBe(responceError.authenticationFailed);
  });
});
