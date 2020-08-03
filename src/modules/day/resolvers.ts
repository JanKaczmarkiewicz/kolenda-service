import Entrance from "../../models/Entrance";
import Day from "../../models/Day";
import House from "../../models/House";
import PastoralVisit from "../../models/PastoralVisit";
import { Resolvers } from "../../types/types";
import Season from "../../models/Season";
import Street from "../../models/Street";

export const resolvers: Resolvers = {
  Day: {
    id: (day) => day._id.toHexString(),
    season: async (day) =>
      day.season ? Season.findOne({ _id: day.season }) : null,
    assignedStreets: async (day) =>
      Street.find({ _id: { $in: day.assignedStreets } }),
    pastoralVisits: async (day) => PastoralVisit.find({ day: day._id }),
  },
  Mutation: {
    addDay: async (_, { input }) => new Day(input).save(),
    updateDay: async (_, { input: { id, ...rest } }, __, ___) => {
      if (rest.assignedStreets) {
        //TODO: TEST IT!
        // compare all  that has been deleted in this update
        const { assignedStreets } = rest;

        const dayToUpdate = await Day.findOne({ _id: id });

        if (!dayToUpdate) return null;

        const { assignedStreets: oldAssignedStreets } = dayToUpdate;

        const removedStreets = oldAssignedStreets
          .map((id) => id.toHexString())
          .filter((id) => !assignedStreets.includes(id));

        const [housesIds, pastoralVisitsIds] = await Promise.all([
          House.find({
            street: { $in: removedStreets },
          }).distinct("_id"),
          PastoralVisit.find({ day: id }).distinct("_id"),
        ]);

        //TODO: remove all linked houses with deleted streets
        await Entrance.deleteMany({
          house: { $in: housesIds },
          pastoralVisit: { $in: pastoralVisitsIds },
        });
      }

      return Day.findOneAndUpdate({ _id: id }, { $set: rest }, { new: true });
    },
  },
  Query: {
    day: async (_, { input }) => Day.findOne({ _id: input.id }),
    days: async (_, { input }) => Day.find({ season: input.season }),
  },
};
