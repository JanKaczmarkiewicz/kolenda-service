import { defaultFieldResolver, GraphQLField } from "graphql";
import { SchemaDirectiveVisitor, UserInputError } from "apollo-server";

import { responceError } from "../errors/responce";
import { validateArgs } from "../utils/validateArgs";

import { Context } from "../types/util";
import { validators } from "../modules";

export class ValidateDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, Context>) {
    const { resolve = defaultFieldResolver } = field;
    const { schemaName } = this.args as { schemaName: string };

    if (typeof schemaName !== "string") {
      throw new Error("schemaName should be a string!");
    }

    const validator = (validators as any)[schemaName];
    if (!validator) {
      throw new Error(`Schema not found: ${schemaName}`);
    }

    field.resolve = async (...resolverArgs) => {
      const [, args] = resolverArgs;
      const validationErrors = await validateArgs(validator, args.input);
      if (validationErrors.length > 0) {
        throw new UserInputError(responceError.validationFails, {
          validationErrors,
        });
      }

      return resolve.apply(this, resolverArgs);
    };
  }
}
