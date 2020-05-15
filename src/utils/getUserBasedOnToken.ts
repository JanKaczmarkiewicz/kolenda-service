import { verifyAuthToken } from "./authToken";
import { UserDbObject } from "../types/types";
import User from "../models/User";

const getUserBasedOnToken = async (
  token: string
): Promise<UserDbObject | null> => {
  const tokenData = verifyAuthToken(token);

  if (!tokenData) return null;

  const foundUser = await User.findOne({
    _id: tokenData.id,
  });

  if (!foundUser) return null;

  return foundUser;
};

export default getUserBasedOnToken;
