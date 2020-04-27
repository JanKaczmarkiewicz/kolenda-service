import * as fs from "fs";
import * as path from "path";
import { IResolvers } from "graphql-tools";
import { AuthenticatedDirective } from "../directives/authenticated";
import gql from "graphql-tag";
import { DIRECTIVES } from "@graphql-codegen/typescript-mongodb";
import { ValidateDirective } from "../directives/validate";

const pathToModules = path.join(__dirname, "../modules");

export default () => {
  const folders = fs
    .readdirSync(pathToModules)
    .filter((folder) => !folder.startsWith("_"));

  //resolvers
  const resolvers: IResolvers = {};
  folders.forEach((folder) => {
    const resolversPath = `${pathToModules}\\${folder}\\resolvers.ts`;
    if (!fs.existsSync(resolversPath)) return;

    const moduleResolvers = require(resolversPath).resolvers;

    Object.keys(moduleResolvers).forEach((name) => {
      if (!resolvers[name]) Object.assign(resolvers, { [name]: {} });
      Object.assign(resolvers[name], moduleResolvers[name]);
    });
  });

  //typeDefs
  const moduleTypeDefs = folders
    .map((folder) =>
      fs.readFileSync(`${pathToModules}\\${folder}\\schema.graphql`, "utf8")
    )
    .join(" ");

  const typeDefsStr = `
  type Query {
    _empty: String
  } 
  type Mutation {
    _empty: String
  }
  ${moduleTypeDefs}`;

  const typeDefs = [gql(typeDefsStr), DIRECTIVES];

  //directives
  const directives = {
    authenticated: AuthenticatedDirective,
    validate: ValidateDirective,
  };

  return { typeDefs, resolvers, directives };
};
