import * as fs from "fs";
import * as path from "path";
import { DIRECTIVES } from "@graphql-codegen/typescript-mongodb";
import { gql } from "apollo-server";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";

import { AuthenticatedDirective } from "../directives/authenticated";
import { ValidateDirective } from "../directives/validate";
import { date } from "../customScalars/date";

const pathToModules = path.join(__dirname, "../modules");
const folders = fs.readdirSync(pathToModules);

const importModuleFile = (relPath: string) => {
  const filePath = path.join(pathToModules, relPath);
  if (fs.existsSync(filePath + ".ts")) return require(filePath + ".ts");
  if (fs.existsSync(filePath + ".js")) return require(filePath + ".js");
  return null;
};

// resolvers
const moduleResolvers = folders.reduce((moduleResolversMaps, folder) => {
  const moduleResolverMap = importModuleFile(`${folder}/resolvers`);
  if (!moduleResolverMap) return moduleResolversMaps;
  return [...moduleResolversMaps, moduleResolverMap.resolvers];
}, [] as any[]);

const scalarsResolvers = [{ DateTime: date }];
const resolvers = mergeResolvers([...moduleResolvers, ...scalarsResolvers]);
export { resolvers };

// typeDefs
const typesArray = fileLoader(pathToModules, { recursive: true });
const mergedGraphql = mergeTypes(typesArray, { all: true });
const typeDefs = [gql(mergedGraphql), DIRECTIVES];
export { typeDefs };

// directives
const directives = {
  authenticated: AuthenticatedDirective,
  validate: ValidateDirective,
};
export { directives };

// validators
const validators = folders.reduce((validatorsMap, folder) => {
  const validator = importModuleFile(`${folder}/validators`);
  return validator ? { ...validatorsMap, ...validator } : validatorsMap;
}, {});

export { validators };
