import { Resolvers } from "../../types/types";
import "reflect-metadata";
import PastoralVisit from "../../models/PastoralVisit";
import User from "../../models/User";
import Entrance from "../../models/Entrance";
import Season from "../../models/Season";

export const resolvers: Resolvers = {
  PastoralVisit: {
    id: (pastoralVisit) => pastoralVisit._id.toHexString(),
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
    season: async (pastoralVisit) =>
      Season.findOne({
        _id: pastoralVisit.season?.toHexString(),
      }),
  },
  Mutation: {
    addPastoralVisit: async (_, { input }) => new PastoralVisit(input).save(),

    updatePastoralVisit: async (_, { input }) =>
      PastoralVisit.findByIdAndUpdate(
        { _id: input.id },
        { visitTime: input.visitTime, reeceTime: input.reeceTime },
        { new: true }
      ),
  },
  Query: {
    pastoralVisit: async (_, { input }) =>
      PastoralVisit.findOne({ _id: input.id }),
    pastoralVisits: async () => PastoralVisit.find(),
  },
};
