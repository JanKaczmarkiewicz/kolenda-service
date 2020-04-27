import { Resolvers } from "../../types/types";
import House from "../../models/House";
import Street from "../../models/Street";

export const resolvers: Resolvers = {
  House: {
    id: (house) => house._id + "",
    street: async (house) => Street.findById(house.street?.toString()),
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
    house: async (_, { input }) => House.findOne({ id: input.id }),
    houses: async () => House.find(),
  },
};
