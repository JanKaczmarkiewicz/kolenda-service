import { Resolvers } from "../../types/types";
import "reflect-metadata";
import PastoralVisit from "../../models/PastoralVisit";
import User from "../../models/User";
import Entrance from "../../models/Entrance";
import Season from "../../models/Season";

/**
 * @returns {start: (when day starts), end: (when day ends)}
 * @param date
 */
const getDayRange = (date: Date) => ({
  start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 1, 0, 0),
  end: new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1,
    0,
    59,
    59
  ),
});

export const resolvers: Resolvers = {
  PastoralVisit: {
    id: (pastoralVisit) => pastoralVisit._id.toHexString(),
    priest: async (pastoralVisit) =>
      User.findOne({ _id: pastoralVisit.priest?.toHexString() }),
    acolytes: async (pastoralVisit) =>
      User.find({
        _id: { $in: pastoralVisit.acolytes },
      }),
    entrances: async (pastoralVisit) =>
      Entrance.find({
        pastoralVisit: pastoralVisit._id.toHexString(),
      }),
    season: async (pastoralVisit) =>
      Season.findOne({
        _id: pastoralVisit.season?.toHexString(),
      }),
  },
  Mutation: {
    addPastoralVisit: async (_, { input }) => new PastoralVisit(input).save(),

    updatePastoralVisit: async (_, { input }) =>
      PastoralVisit.findByIdAndUpdate(
        { _id: input.id },
        { visitTime: input.visitTime, reeceTime: input.reeceTime },
        { new: true }
      ),
  },
  Query: {
    pastoralVisit: async (_, { input }) =>
      PastoralVisit.findOne({ _id: input.id }),
    pastoralVisits: async (_, { input }) => {
      if (!input.date) return PastoralVisit.find({});

      const requestedDate = new Date(input.date);

      const { start, end } = getDayRange(requestedDate);

      const range = {
        $gte: start,
        $lt: end,
      };

      const query = {
        $or: [{ reeceTime: range }, { visitTime: range }],
      };
      const result = await PastoralVisit.find(query);

      return result;
    },
  },
};
