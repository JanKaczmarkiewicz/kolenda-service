import { Resolvers } from "../../types/types";
import Entry from "../../models/Entry";

export const resolvers: Resolvers = {
  Entry: {
    id: (pastoralVisit) => pastoralVisit._id + "",
  },
  Mutation: {
    addEntry: async (_, { input }) => new Entry(input).save(),
    updateEntry: async (_, { input: { id, ...rest } }) =>
      Entry.findOneAndUpdate({ _id: id }, { $set: rest }),
  },
  Query: {
    entry: async (_, { input }) => Entry.findOne({ _id: input.id }),
    entries: async () => Entry.find(),
  },
};
