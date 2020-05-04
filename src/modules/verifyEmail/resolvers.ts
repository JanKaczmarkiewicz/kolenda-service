import { AuthenticationError, ForbiddenError } from "apollo-server-core";
import { Resolvers } from "../../types/types";

import User from "../../models/User";
import { verifyConfirmingToken } from "../../utils/confirmingToken";
import { responceError } from "../../errors/responce";

export const resolvers: Resolvers = {
  Mutation: {
    verifyEmail: async (_, { input: { token } }) => {
      const userId = verifyConfirmingToken(token);

      if (!userId) throw new ForbiddenError(responceError.badConfirmingToken);

      const foundUser = await User.findOneAndUpdate(
        { _id: userId },
        { confirmed: true },
        { new: true }
      );

      if (!foundUser)
        throw new AuthenticationError(responceError.userNotExists);

      return foundUser.confirmed;
    },
  },
};
