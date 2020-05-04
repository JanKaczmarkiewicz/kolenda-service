import { Resolvers, UserDbObject } from "../../types/types";

export const resolvers: Resolvers = {
  Query: {
    me: async (_, __, { user }) => user as UserDbObject,
  },
};
