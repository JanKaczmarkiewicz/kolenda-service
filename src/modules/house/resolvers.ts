import { Resolvers } from "../../types/types";
import House from "../../models/House";
import Street from "../../models/Street";

export const resolvers: Resolvers = {
  House: {
    id: (house) => house._id.toHexString(),
    street: async (house) =>
      await Street.findOne({ _id: house.street?.toHexString() }),
  },
  Mutation: {
    addHouse: async (_, { input }) => await new House(input).save(),

    updateHouse: async (_, { input: { id, ...rest } }) =>
      House.findOneAndUpdate({ _id: id }, { $set: rest }),

    deleteHouse: async (_, { input }) => {
      console.log(await House.deleteOne({ _id: input.id }));
      return true;
    },
  },
  Query: {
    house: async (_, { input }) => House.findOne({ _id: input.id }),
    houses: async () => House.find(),
  },
};
