import * as bcrypt from "bcryptjs";
import { AuthenticationError, ForbiddenError } from "apollo-server-core";
import { Resolvers, UserDbObject } from "../../types/types";

import User from "../../models/User";

import { signAuthToken } from "../../utils/authToken";

import { sendConfirmingEmail } from "../../utils/sendConfirmingEmail";
import {
  signConfirmingToken,
  verifyConfirmingToken,
} from "../../utils/confirmingToken";
import { responceError } from "../../errors/responce";

export const resolvers: Resolvers = {
  Query: {
    me: async (_, __, { user }) => user!,
  },
  Mutation: {
    register: async (_, { input: { password, username, email } }) => {
      const foundUsers = await User.find({ $or: [{ username }, { email }] });

      if (foundUsers.length > 0)
        throw new ForbiddenError(responceError.userExists);

      const hashedPassword = await bcrypt.hash(password, 10);

      const savedUser = await new User({
        username,
        email,
        password: hashedPassword,
        confirmed: false,
      }).save();

      const confirmingToken = signConfirmingToken({ id: savedUser.id });
      await sendConfirmingEmail(confirmingToken, savedUser);

      const authToken: string = signAuthToken({ id: savedUser.id });
      return authToken;
    },
    login: async (_, { input: { email, password } }) => {
      const foundUser = await User.findOne({ email });

      if (!foundUser)
        throw new AuthenticationError(responceError.invalidCredentials);

      const isPasswordCorrect = await bcrypt.compare(
        password,
        foundUser.password
      );

      if (!isPasswordCorrect)
        throw new AuthenticationError(responceError.invalidCredentials);

      return signAuthToken({ id: foundUser.id });
    },
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
