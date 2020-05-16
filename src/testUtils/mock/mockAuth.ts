import { MutationRegisterArgs, Role, RegisterInput } from "../../types/types";
import { query } from "../query";
import { REGISTER, VERIFY_EMAIL, LOGIN, ME } from "../queries";
import { authTokenToVerificationToken } from "../../utils/authTokenToVerificationToken";
import User from "../../models/User";
import { signAuthToken } from "../../utils/authToken";

const user: RegisterInput = {
  email: "Exaple@gmail.com",
  password: "shbdkjasldnlash",
  username: "example_user",
};
export const signUser = async (
  userData: RegisterInput = user,
  role: Role = Role.User
): Promise<string> => {
  const savedUser = await new User({
    ...userData,
    confirmed: true,
    role,
  }).save();
  return signAuthToken({ id: savedUser._id.toHexString() });
};

export const symulateAuth = (userData: RegisterInput) => {
  const stack: ((prevRes: any) => any)[] = [];

  const execute = async () =>
    stack
      .reduce(
        (promise, callback: any) => promise.then(callback),
        Promise.resolve()
      )
      .catch(console.error) as any;

  const register = () => {
    stack.push(() =>
      query({ query: REGISTER, input: userData }).then((res) => {
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
        input: { token: verificationToken },
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
        input: { email: userData.email, password: userData.password },
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
          input: { email: userData.email, password: userData.password },
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
