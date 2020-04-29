import { Resolvers } from "../../types/types";
import Season from "../../models/Season";
import PastoralVisit from "../../models/PastoralVisit";

export const resolvers: Resolvers = {
  Season: {
    id: (season) => season._id + "",
    pastoralVisits: async (season) =>
      PastoralVisit.find({ season: season._id }),
  },
  Mutation: {
    addSeason: async (_, { input }) => await new Season(input).save(),
  },
  Query: {
    season: async (_, { input }) => Season.findOne({ _id: input.id }),
    seasons: async () => Season.find(),
  },
};
