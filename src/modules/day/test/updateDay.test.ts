import { setup } from "../../../testUtils/beforeAllSetup";
import { signUser } from "../../../testUtils/mock/mockAuth";
import { query } from "../../../testUtils/query";
import gql from "graphql-tag";
import {
  badToken,
  dummyStreetData,
  dummyUserData,
} from "../../../testUtils/dummyData";
import { responceError } from "../../../errors/responce";
import { DayFragment } from "../../../testUtils/fragments";
import PastoralVisit from "../../../models/PastoralVisit";
import Entrance from "../../../models/Entrance";
import Street from "../../../models/Street";
import House from "../../../models/House";
import { addDay } from "../../../testUtils/mock/mockDay";
import { UpdateDayInput, DayDbObject } from "../../../types/types";
import Day from "../../../models/Day";
import User from "../../../models/User";

let token: string;

const UPDATE_DAY = gql`
  mutation updateDay($input: UpdateDayInput!) {
    updateDay(input: $input) {
      ...DayFragment
    }
  }
  ${DayFragment}
`;
let day: DayDbObject;

beforeAll(async () => {
  await setup();
  token = await signUser();
  const mock = await addDay();

  day = mock.day;
});

describe("updateDay", () => {
  it("Input gets validated", async () => {
    const input: UpdateDayInput = {
      id: day._id.toHexString(),
      reeceDate: new Date(Date.now() + 9000).toISOString(),
      visitDate: new Date(Date.now() + 4000).toISOString(),
    };

    const res = await query(
      {
        query: UPDATE_DAY,
        input,
      },
      token
    );

    expect(res.data?.updateDay).toBeFalsy();
    expect(res.errors?.length).toBeGreaterThan(0);
  });

  it("Authenticated user can updateDay", async () => {
    const priest = await new User(dummyUserData).save();

    const pastoralVisit = await new PastoralVisit({
      hour: 16,
      priest: priest._id.toHexString(),
      acolytes: [],
      day: day._id.toHexString(),
    }).save();

    const street = await new Street(dummyStreetData).save();
    const secondStreet = await new Street({ name: "SecondStreet" }).save();

    const house = await new House({
      number: "10a",
      street: street._id.toHexString(),
    }).save();

    const secondHouse = await new House({
      number: "20b",
      street: secondStreet._id.toHexString(),
    }).save();

    const thirdHouse = await new House({
      number: "30f",
      street: street._id.toHexString(),
    }).save();

    //here I use `house` in entrance therefore it shouldn't a be returned in updateDay.unusedHouses response
    await new Entrance({
      house: house._id.toHexString(),
      pastoralVisit: pastoralVisit._id.toHexString(),
    }).save();

    const input: UpdateDayInput = {
      id: day._id.toHexString(),
      assignedStreets: [street, secondStreet].map(({ _id }) =>
        _id.toHexString()
      ),
    };

    const res = await query(
      {
        query: UPDATE_DAY,
        input,
      },
      token
    );

    expect(res.data?.updateDay).toEqual({
      id: day._id.toHexString(),
      reeceDate: day.reeceDate.toISOString(),
      visitDate: day.visitDate.toISOString(),
      season: {
        id: day.season?.toHexString(),
      },
      pastoralVisits: expect.arrayContaining([
        {
          id: pastoralVisit._id.toHexString(),
        },
      ]),
      unusedHouses: expect.arrayContaining([
        { id: secondHouse._id.toHexString() },
        { id: thirdHouse._id.toHexString() },
      ]),
    });
  });

  it("Unauthenticated user can not updateDay.", async () => {
    const input: UpdateDayInput = {
      id: day._id.toHexString(),
    };

    const res = await query(
      {
        query: UPDATE_DAY,
        input,
      },
      badToken
    );

    expect(res.data?.updateDay).toBeFalsy();
    expect(res.errors?.[0].message).toBe(responceError.authenticationFailed);
  });
});
