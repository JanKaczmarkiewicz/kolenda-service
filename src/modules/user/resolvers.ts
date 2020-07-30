import User from "../../models/User";
import { Resolvers } from "../../types/types";

export const resolvers: Resolvers = {
  Query: {
    user: async (_, { input: { id } }) => User.findOne({ _id: id }),
    users: async (_, { input }) => {
      const queryOptions = input.role ? { role: input.role } : {};
      return User.find(queryOptions);
    },
  },
  User: {
    id: (user) => user._id.toHexString(),
  },
};
