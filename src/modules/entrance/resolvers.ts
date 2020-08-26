import { Resolvers } from "../../types/types";
import Entrance from "../../models/Entrance";
import House from "../../models/House";
import PastoralVisit from "../../models/PastoralVisit";
import { castToObjectId } from "../../utils/castToObjectId";

export const resolvers: Resolvers = {
  Entrance: {
    id: (entrance) => entrance._id.toHexString(),

    house: async (entrance) =>
      House.findOne({ _id: entrance.house?.toHexString() }),

    pastoralVisit: async (entrance) =>
      PastoralVisit.findOne({ _id: entrance.pastoralVisit?.toHexString() }),
  },
  Mutation: {
    addEntrance: async (_, { input }) => new Entrance(input).save(),

    addEntrances: async (_, { input: { houses, pastoralVisit } }) => {
      const docs = houses.map((house) => ({ house, pastoralVisit }));
      return Entrance.insertMany(docs);
    },

    updateEntrance: async (_, { input: { id, pastoralVisit, ...rest } }) => {
      const update = {
        ...rest,
        ...(pastoralVisit && { pastoralVisit: castToObjectId(pastoralVisit) }),
      };
      return Entrance.findOneAndUpdate(
        { _id: id },
        { $set: update },
        { new: true }
      );
    },

    updateEntrances: async (_, { input: { ids, ...rest } }) => {
      const queryOptions = { _id: { $in: ids } };

      const update = {
        pastoralVisit: castToObjectId(rest.pastoralVisit),
      };

      await Entrance.updateMany(queryOptions, { $set: update });
      return Entrance.find(queryOptions);
    },

    deleteEntrance: async (_, { input }) =>
      (await Entrance.findByIdAndDelete(input.id)) ? true : false,

    deleteEntrances: async (_, { input }) => {
      const { ok } = await Entrance.deleteMany({ _id: { $in: input.ids } });
      return ok && ok === 1 ? true : false;
    },
  },
  Query: {
    entrance: async (_, { input }) => Entrance.findOne({ _id: input.id }),
  },
};
