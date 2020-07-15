import { Resolvers } from "../../types/types";
import Entrance from "../../models/Entrance";
import House from "../../models/House";
import PastoralVisit from "../../models/PastoralVisit";
import { validateArgs } from "../../utils/validateArgs";
import { addEntranceValidation } from "./validators";

export const resolvers: Resolvers = {
  Entrance: {
    id: (entrance) => entrance._id.toHexString(),
    house: async (entrance) =>
      House.findOne({ _id: entrance.house?.toHexString() }),
    pastoralVisit: async (entrance) =>
      PastoralVisit.findOne({ _id: entrance.pastoralVisit?.toHexString() }),
  },
  Mutation: {
    addEntrance: async (_, { input }) => new Entrance(input).save(),
    updateEntrance: async (_, { input: { id, ...rest } }) =>
      Entrance.findOneAndUpdate({ _id: id }, { $set: rest }, { new: true }),
  },
  Query: {
    entrance: async (_, { input }) => Entrance.findOne({ _id: input.id }),
  },
};
