import { MutationRegisterArgs, Role } from "../../types/types";
import { query } from "../query";
import { REGISTER, VERIFY_EMAIL, LOGIN, ME } from "../queries";
import { authTokenToVerificationToken } from "../../utils/authTokenToVerificationToken";
import User from "../../models/User";
import { signAuthToken } from "../../utils/authToken";

const user: MutationRegisterArgs = {
  email: "Exaple@gmail.com",
  password: "shbdkjasldnlash",
  username: "example_user",
};
export const signUser = async (
  userData: MutationRegisterArgs = user,
  role: Role = Role.User
): Promise<string> => {
  const savedUser = await new User({
    ...userData,
    confirmed: true,
    role,
  }).save();
  return signAuthToken({ id: savedUser._id.toHexString() });
};

export const symulateAuth = (userData: MutationRegisterArgs) => {
  const stack: Function[] = [];

  const execute = async () =>
    <any>(
      stack
        .reduce(
          (promise, callback: any) => promise.then(callback),
          Promise.resolve()
        )
        .catch(console.error)
    );

  const register = () => {
    stack.push(() =>
      query({ query: REGISTER, variables: userData }).then((res) => {
        // console.log(res);
        return res.data?.register;
      })
    );
    return { verifyEmail, login, execute };
  };

  const verifyEmail = () => {
    stack.push((authToken: string) => {
      const verificationToken = authTokenToVerificationToken(authToken);
      return query({
        query: VERIFY_EMAIL,
        variables: { token: verificationToken },
      }).then((res) => {
        // console.log(res);
        return res.data?.verifyEmail;
      });
    });

    return { login, execute };
  };

  const login = () => {
    stack.push(() =>
      query({
        query: LOGIN,
        variables: { email: userData.email, password: userData.password },
      }).then((res) => {
        // console.log(res);
        return res.data?.login;
      })
    );

    return { me, execute };
  };

  const me = () => {
    stack.push(async (authToken: string) =>
      query(
        {
          query: ME,
          variables: { email: userData.email, password: userData.password },
        },
        authToken
      )
        .then((res) => {
          return res.data?.me;
        })
        .catch(console.error)
    );

    return { execute };
  };

  return { register };
};
