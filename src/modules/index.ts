import * as fs from "fs";
import * as path from "path";
import gql from "graphql-tag";
import { DIRECTIVES } from "@graphql-codegen/typescript-mongodb";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";

import { AuthenticatedDirective } from "../directives/authenticated";
import { ValidateDirective } from "../directives/validate";
import { date } from "../customScalars/date";

const pathToModules = path.join(__dirname, "../modules");
const folders = fs.readdirSync(pathToModules);

// resolvers
const moduleResolvers = folders.reduce((resolvers, folder) => {
  const resolversPath = path.join(pathToModules, `${folder}/resolvers.ts`);
  if (!fs.existsSync(resolversPath)) return resolvers;

  const moduleResolvers = require(resolversPath).resolvers;
  return [...resolvers, moduleResolvers];
}, [] as any[]);
const scalarsResolvers = [{ DateTime: date }];
const resolvers = mergeResolvers([...moduleResolvers, ...scalarsResolvers]);
export { resolvers };

//typeDefs
const typesArray = fileLoader(pathToModules, { recursive: true });
const mergedGraphql = mergeTypes(typesArray, { all: true });
const typeDefs = [gql(mergedGraphql), DIRECTIVES];
export { typeDefs };

//directives
const directives = {
  authenticated: AuthenticatedDirective,
  validate: ValidateDirective,
};
export { directives };

//validators
const validators = folders.reduce((validators, folder) => {
  const validatorPath = path.join(pathToModules, `${folder}/validators.ts`);
  return fs.existsSync(validatorPath)
    ? { ...validators, ...require(validatorPath) }
    : validators;
}, {});

export { validators };
