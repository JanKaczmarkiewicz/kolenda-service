import { GraphQLScalarType } from "graphql";

export const date = new GraphQLScalarType({
  name: "DateTime",
  description: "Date scalar type",
  serialize: (value: Date) => value.toISOString(),
});
