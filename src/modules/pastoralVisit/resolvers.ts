import { Resolvers } from "../../types/types";
import PastoralVisit from "../../models/PastoralVisit";
import User from "../../models/User";
import Entrance from "../../models/Entrance";
import Day from "../../models/Day";
import { castToObjectId } from "../../utils/castToObjectId";

export const resolvers: Resolvers = {
  PastoralVisit: {
    id: (pastoralVisit) => pastoralVisit._id.toHexString(),
    day: async (pastoralVisit) => Day.findOne({ _id: pastoralVisit.day! }),
    priest: async (pastoralVisit) =>
      User.findOne({ _id: pastoralVisit.priest?.toHexString() }),
    acolytes: async (pastoralVisit) =>
      User.find({
        _id: { $in: pastoralVisit.acolytes },
      }),
    entrances: async (pastoralVisit) =>
      Entrance.find({
        pastoralVisit: pastoralVisit._id.toHexString(),
      }),
  },
  Mutation: {
    addPastoralVisit: async (_, { input }) => new PastoralVisit(input).save(),

    updatePastoralVisit: async (_, { input: { id, ...rest } }) => {
      const update = {
        ...rest,
        priest: rest.priest ? castToObjectId(rest.priest) : undefined,
        acolytes: rest.acolytes?.map(castToObjectId),
      };

      return PastoralVisit.findByIdAndUpdate(
        { _id: id },
        { $set: update },
        { new: true }
      );
    },
  },
  Query: {
    pastoralVisit: async (_, { input }) =>
      PastoralVisit.findOne({ _id: input.id }),
    pastoralVisits: async () => PastoralVisit.find({}),
  },
};
