import { setup } from "../../../testUtils/beforeAllSetup";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { query } from "../../../testUtils/query";
import gql from "graphql-tag";
import { PastoralVisitFragment } from "../../../testUtils/fragments";
import {
  AddPastoralVisitInput,
  UserDbObject,
  SeasonDbObject,
} from "../../../types/types";
import { mockDbBeforeAddingPastralVisit } from "../../../testUtils/mock/mockPastoralVisit";
import PastoralVisit from "../../../models/PastoralVisit";
import { badToken } from "../../../testUtils/dummyData";
import { responceError } from "../../../errors/responce";

let token: string;

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

beforeAll(async () => {
  await setup();
  token = await signUser();
  const mock = await mockDbBeforeAddingPastralVisit();
  acolytes = mock.acolytes;
  priest = mock.priest;
  season = mock.season;
});

describe("addPastoralVisit", () => {
  it("Input is validated", async () => {
    const validationCase = async (
      input: AddPastoralVisitInput,
      errors: { name: string; message: string }[]
    ) => {
      const res = await query(
        {
          query: ADD_PASTORAL_VISIT,
          input,
        },
        token
      );

      const foundPastoralVisits = await PastoralVisit.find({});
      expect(foundPastoralVisits).toHaveLength(0);

      expect(res.data?.addPastoralVisit).toBeFalsy();

      expect(res.errors?.[0].extensions?.validationErrors).toEqual(errors);
    };

    {
      //reece time after the visit time case
      const input: AddPastoralVisitInput = {
        acolytes: acolytes.map(({ _id }) => _id.toHexString()),
        priest: priest._id.toHexString(),
        visitTime: new Date(Date.now() - 1000).toISOString(),
        reeceTime: new Date(Date.now()).toISOString(),
        season: season._id.toHexString(),
      };

      validationCase(input, [
        {
          name: "visitTime",
          message: expect.stringContaining(
            "visitTime field must be later than"
          ),
        },
      ]);
    }

    {
      //reece time in past case
      const input: AddPastoralVisitInput = {
        acolytes: acolytes.map(({ _id }) => _id.toHexString()),
        priest: priest._id.toHexString(),
        visitTime: new Date(Date.now()).toISOString(),
        reeceTime: new Date(Date.now() - 1000).toISOString(),
        season: season._id.toHexString(),
      };

      validationCase(input, [
        {
          name: "visitTime",
          message: expect.stringContaining(
            "visitTime field must be later than"
          ),
        },
      ]);
    }
  });
  it("Authenticated user can addPastoralVisit", async () => {
    const input: AddPastoralVisitInput = {
      acolytes: acolytes.map(({ _id }) => _id.toHexString()),
      priest: priest._id.toHexString(),
      visitTime: new Date().toISOString(),
      reeceTime: new Date().toISOString(),
      season: season._id.toHexString(),
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
      acolytes: expect.arrayContaining(input.acolytes.map((id) => ({ id }))),
      visitTime: input.visitTime,
      reeceTime: input.reeceTime,
      season: { id: input.season },
    });
  });

  it("Unauthenticated user can not addPastoralVisit.ts.", async () => {
    const input: AddPastoralVisitInput = {
      acolytes: acolytes.map(({ _id }) => _id.toHexString()),
      priest: priest._id.toHexString(),
      visitTime: new Date().toISOString(),
      reeceTime: new Date().toISOString(),
      season: season._id.toHexString(),
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
});
