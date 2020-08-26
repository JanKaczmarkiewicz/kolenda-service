import { Resolvers } from "../../types/types";
import House from "../../models/House";
import Street from "../../models/Street";
import Entrance from "../../models/Entrance";
import PastoralVisit from "../../models/PastoralVisit";

export const resolvers: Resolvers = {
  House: {
    id: (house) => house._id.toHexString(),
    street: async (house) =>
      Street.findOne({ _id: house.street?.toHexString() }),
  },
  Mutation: {
    addHouse: async (_, { input }) => new House(input).save(),
  },
  Query: {
    house: async (_, { input }) => House.findOne({ _id: input.id }),
  }
};
