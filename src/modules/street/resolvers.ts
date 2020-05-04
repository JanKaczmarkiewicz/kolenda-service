import { Resolvers } from "../../types/types";
import Street from "../../models/Street";
import House from "../../models/House";

export const resolvers: Resolvers = {
  Mutation: {
    addStreet: async (_, { input }) => new Street(input).save(),
    updateStreet: async (_, { input: { id, ...rest } }) =>
      Street.findOneAndUpdate({ _id: id }, { $set: rest }, { new: true }),
  },
  Street: {
    id: (street) => street._id.toHexString(),
    houses: async (street) => House.find({ street: street._id }),
  },
  Query: {
    street: async (_, { input }) => Street.findOne({ _id: input.id }),
    streets: async () => Street.find(),
  },
};
