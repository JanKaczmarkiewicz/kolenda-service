import { Resolvers } from "../../types/types";
import Entry from "../../models/Entry";
import House from "../../models/House";
import PastoralVisit from "../../models/PastoralVisit";
import { validateArgs } from "../../utils/validateArgs";
import { addEntryValidation } from "./validators";

export const resolvers: Resolvers = {
  Entry: {
    id: (entry) => entry._id.toHexString(),
    house: async (entry) => House.findOne({ _id: entry.house?.toHexString() }),
    pastoralVisit: async (entry) =>
      PastoralVisit.findOne({ _id: entry.pastoralVisit?.toHexString() }),
  },
  Mutation: {
    addEntry: async (_, { input }) =>
      validateArgs(addEntryValidation, input).then(() =>
        new Entry(input).save()
      ),
    updateEntry: async (_, { input: { id, ...rest } }) =>
      Entry.findOneAndUpdate({ _id: id }, { $set: rest }, { new: true }),
  },
  Query: {
    entry: async (_, { input }) => Entry.findOne({ _id: input.id }),
    entries: async () => Entry.find(),
  },
};
