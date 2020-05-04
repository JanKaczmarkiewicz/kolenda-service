import { DocumentNode } from "graphql";
import createServer from "../server/createServer";
import { createTestClient } from "apollo-server-testing";
import { ServerOptions } from "../types/util";

type Query = {
  query: DocumentNode;
  input?: {
    [name: string]: any;
  };
};

export const query = (gql: Query, token?: string) => {
  const options: ServerOptions = token ? { token: `Bearer ${token}` } : {};
  const { query: request } = createTestClient(createServer(options));
  return request({ query: gql.query, variables: { input: gql.input } });
};
