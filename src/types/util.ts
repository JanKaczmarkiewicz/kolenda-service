import { UserDbObject } from "./types";

export interface TokenData {
  id: string;
}

export type Context = {
  user: UserDbObject | null;
  req: Express.Request;
  res: Express.Response;
};

export interface ServerOptions {
  token?: string;
}
