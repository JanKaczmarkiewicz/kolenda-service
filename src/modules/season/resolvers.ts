import { Resolvers } from "../../types/types";
import Season from "../../models/Season";
import Day from "../../models/Day";

export const resolvers: Resolvers = {
  Season: {
    id: (season) => season._id.toHexString(),
    days: async (season) => Day.find({ season: season._id }),
  },
  Mutation: {
    addSeason: async (_, { input }) => new Season(input).save(),
  },
  Query: {
    season: async (_, { input }) => Season.findOne({ _id: input.id }),
    seasons: async () => Season.find(),
  },
};
