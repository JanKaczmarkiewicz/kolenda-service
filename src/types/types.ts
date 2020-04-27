// THIS IS A GENERATED FILE, DO NOT MODIFY
// tslint:disable
import { Context } from './util';
import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };



import { ObjectID } from 'mongodb';
export type EntryDbObject = {
  _id: ObjectID,
  house: House,
  visitState: RecordState,
  reeceState: RecordState,
  comment: string,
  pastoralVisit: PastoralVisit,
};

export type HouseDbObject = {
  _id: ObjectID,
  number: string,
  street?: Maybe<StreetDbObject['_id']>,
};

export type PastoralVisitDbObject = {
  _id: ObjectID,
  priest: UserDbObject['_id'],
  acolytes: Array<Maybe<User>>,
  visitTime: string,
  reeceTime: string,
  season: Season,
};

export type SeasonDbObject = {
  _id: ObjectID,
  name: string,
};

export type StreetDbObject = {
  _id: ObjectID,
  name: string,
};

export type UserDbObject = {
  _id: ObjectID,
  username: string,
  email: string,
  confirmed: boolean,
  role: Role,
  password: string,
};

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};











export type Entry = {
  id: Scalars['String'];
  house: House;
  visitState: RecordState;
  reeceState: RecordState;
  comment: Scalars['String'];
  pastoralVisit: PastoralVisit;
};

export enum RecordState {
  Unknown = 'UNKNOWN',
  Accepted = 'ACCEPTED',
  Rejected = 'REJECTED',
  Uncertain = 'UNCERTAIN'
}

export type House = {
  id: Scalars['String'];
  number: Scalars['String'];
  street?: Maybe<Street>;
};

export type Mutation = {
  addHouse?: Maybe<House>;
  addStreet?: Maybe<Street>;
  deleteHouse: Scalars['Boolean'];
  deleteStreet: Scalars['Boolean'];
  login: Scalars['String'];
  register: Scalars['String'];
  updateHouse?: Maybe<House>;
  updateStreet?: Maybe<Street>;
  verifyEmail: Scalars['Boolean'];
};


export type MutationAddHouseArgs = {
  input: AddHouseInput;
};


export type MutationAddStreetArgs = {
  input: AddStreetInput;
};


export type MutationDeleteHouseArgs = {
  input: DeleteHouseInput;
};


export type MutationDeleteStreetArgs = {
  input: DeleteStreetInput;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateHouseArgs = {
  input: UpdateHouseInput;
};


export type MutationUpdateStreetArgs = {
  input: UpdateStreetInput;
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};

export type Query = {
  house?: Maybe<House>;
  houses: Array<Maybe<House>>;
  me: User;
  street?: Maybe<Street>;
  streets: Array<Maybe<Street>>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryHouseArgs = {
  input: HouseInput;
};


export type QueryHousesArgs = {
  input: HouseInput;
};


export type QueryStreetArgs = {
  input: StreetInput;
};


export type QueryStreetsArgs = {
  input: StreetInput;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type AddHouseInput = {
  number: Scalars['String'];
  street: Scalars['String'];
};

export type UpdateHouseInput = {
  id: Scalars['String'];
  number?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
};

export type DeleteHouseInput = {
  id: Scalars['String'];
};

export type HouseInput = {
  id: Scalars['String'];
};

export type HousesInput = {
  id: Scalars['String'];
};

export type PastoralVisit = {
  id: Scalars['String'];
  priest: User;
  acolytes: Array<Maybe<User>>;
  visitTime: Scalars['String'];
  reeceTime: Scalars['String'];
  season: Season;
};

export type Season = {
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Street = {
  id: Scalars['String'];
  name: Scalars['String'];
  houses: Array<Maybe<House>>;
};

export type AddStreetInput = {
  name: Scalars['String'];
};

export type UpdateStreetInput = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type DeleteStreetInput = {
  id: Scalars['String'];
};

export type StreetInput = {
  id: Scalars['String'];
};

export type StreetsInput = {
  id: Scalars['String'];
};

export type User = {
  id: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  confirmed: Scalars['Boolean'];
  role: Role;
};

export enum Role {
  Admin = 'ADMIN',
  Acolyte = 'ACOLYTE',
  Priest = 'PRIEST',
  User = 'USER'
}

export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  String: ResolverTypeWrapper<Scalars['String']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Entry: ResolverTypeWrapper<Omit<Entry, 'house' | 'pastoralVisit'> & { house: ResolversTypes['House'], pastoralVisit: ResolversTypes['PastoralVisit'] }>,
  RecordState: RecordState,
  House: ResolverTypeWrapper<HouseDbObject>,
  Mutation: ResolverTypeWrapper<{}>,
  Query: ResolverTypeWrapper<{}>,
  AddHouseInput: AddHouseInput,
  UpdateHouseInput: UpdateHouseInput,
  DeleteHouseInput: DeleteHouseInput,
  HouseInput: HouseInput,
  HousesInput: HousesInput,
  PastoralVisit: ResolverTypeWrapper<Omit<PastoralVisit, 'priest' | 'acolytes'> & { priest: ResolversTypes['User'], acolytes: Array<Maybe<ResolversTypes['User']>> }>,
  Season: ResolverTypeWrapper<Season>,
  Street: ResolverTypeWrapper<StreetDbObject>,
  AddStreetInput: AddStreetInput,
  UpdateStreetInput: UpdateStreetInput,
  DeleteStreetInput: DeleteStreetInput,
  StreetInput: StreetInput,
  StreetsInput: StreetsInput,
  User: ResolverTypeWrapper<UserDbObject>,
  Role: Role,
  AdditionalEntityFields: AdditionalEntityFields,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  Entry: Omit<Entry, 'house' | 'pastoralVisit'> & { house: ResolversParentTypes['House'], pastoralVisit: ResolversParentTypes['PastoralVisit'] },
  RecordState: RecordState,
  House: HouseDbObject,
  Mutation: {},
  Query: {},
  AddHouseInput: AddHouseInput,
  UpdateHouseInput: UpdateHouseInput,
  DeleteHouseInput: DeleteHouseInput,
  HouseInput: HouseInput,
  HousesInput: HousesInput,
  PastoralVisit: Omit<PastoralVisit, 'priest' | 'acolytes'> & { priest: ResolversParentTypes['User'], acolytes: Array<Maybe<ResolversParentTypes['User']>> },
  Season: Season,
  Street: StreetDbObject,
  AddStreetInput: AddStreetInput,
  UpdateStreetInput: UpdateStreetInput,
  DeleteStreetInput: DeleteStreetInput,
  StreetInput: StreetInput,
  StreetsInput: StreetsInput,
  User: UserDbObject,
  Role: Role,
  AdditionalEntityFields: AdditionalEntityFields,
}>;

export type AuthenticatedDirectiveArgs = {   roles?: Maybe<Array<Maybe<Role>>>; };

export type AuthenticatedDirectiveResolver<Result, Parent, ContextType = Context, Args = AuthenticatedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ValidateDirectiveArgs = {   schemaName?: Maybe<Scalars['String']>; };

export type ValidateDirectiveResolver<Result, Parent, ContextType = Context, Args = ValidateDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type UnionDirectiveArgs = {   discriminatorField?: Maybe<Scalars['String']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type UnionDirectiveResolver<Result, Parent, ContextType = Context, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {   discriminatorField: Scalars['String'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = Context, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {   embedded?: Maybe<Scalars['Boolean']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type EntityDirectiveResolver<Result, Parent, ContextType = Context, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {   overrideType?: Maybe<Scalars['String']>; };

export type ColumnDirectiveResolver<Result, Parent, ContextType = Context, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = {  };

export type IdDirectiveResolver<Result, Parent, ContextType = Context, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {   overrideType?: Maybe<Scalars['String']>; };

export type LinkDirectiveResolver<Result, Parent, ContextType = Context, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = {  };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = Context, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {   path: Scalars['String']; };

export type MapDirectiveResolver<Result, Parent, ContextType = Context, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Entry'] = ResolversParentTypes['Entry']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  house?: Resolver<ResolversTypes['House'], ParentType, ContextType>,
  visitState?: Resolver<ResolversTypes['RecordState'], ParentType, ContextType>,
  reeceState?: Resolver<ResolversTypes['RecordState'], ParentType, ContextType>,
  comment?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  pastoralVisit?: Resolver<ResolversTypes['PastoralVisit'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type HouseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['House'] = ResolversParentTypes['House']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  number?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  street?: Resolver<Maybe<ResolversTypes['Street']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addHouse?: Resolver<Maybe<ResolversTypes['House']>, ParentType, ContextType, RequireFields<MutationAddHouseArgs, 'input'>>,
  addStreet?: Resolver<Maybe<ResolversTypes['Street']>, ParentType, ContextType, RequireFields<MutationAddStreetArgs, 'input'>>,
  deleteHouse?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteHouseArgs, 'input'>>,
  deleteStreet?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteStreetArgs, 'input'>>,
  login?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>,
  register?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'email' | 'password' | 'username'>>,
  updateHouse?: Resolver<Maybe<ResolversTypes['House']>, ParentType, ContextType, RequireFields<MutationUpdateHouseArgs, 'input'>>,
  updateStreet?: Resolver<Maybe<ResolversTypes['Street']>, ParentType, ContextType, RequireFields<MutationUpdateStreetArgs, 'input'>>,
  verifyEmail?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationVerifyEmailArgs, 'token'>>,
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  house?: Resolver<Maybe<ResolversTypes['House']>, ParentType, ContextType, RequireFields<QueryHouseArgs, 'input'>>,
  houses?: Resolver<Array<Maybe<ResolversTypes['House']>>, ParentType, ContextType, RequireFields<QueryHousesArgs, 'input'>>,
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  street?: Resolver<Maybe<ResolversTypes['Street']>, ParentType, ContextType, RequireFields<QueryStreetArgs, 'input'>>,
  streets?: Resolver<Array<Maybe<ResolversTypes['Street']>>, ParentType, ContextType, RequireFields<QueryStreetsArgs, 'input'>>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>,
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>,
}>;

export type PastoralVisitResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PastoralVisit'] = ResolversParentTypes['PastoralVisit']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  priest?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  acolytes?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>,
  visitTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  reeceTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  season?: Resolver<ResolversTypes['Season'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type SeasonResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Season'] = ResolversParentTypes['Season']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type StreetResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Street'] = ResolversParentTypes['Street']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  houses?: Resolver<Array<Maybe<ResolversTypes['House']>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  confirmed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Entry?: EntryResolvers<ContextType>,
  House?: HouseResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  PastoralVisit?: PastoralVisitResolvers<ContextType>,
  Season?: SeasonResolvers<ContextType>,
  Street?: StreetResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  authenticated?: AuthenticatedDirectiveResolver<any, any, ContextType>,
  validate?: ValidateDirectiveResolver<any, any, ContextType>,
  union?: UnionDirectiveResolver<any, any, ContextType>,
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>,
  entity?: EntityDirectiveResolver<any, any, ContextType>,
  column?: ColumnDirectiveResolver<any, any, ContextType>,
  id?: IdDirectiveResolver<any, any, ContextType>,
  link?: LinkDirectiveResolver<any, any, ContextType>,
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>,
  map?: MapDirectiveResolver<any, any, ContextType>,
}>;


/**
* @deprecated
* Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
*/
export type IDirectiveResolvers<ContextType = Context> = DirectiveResolvers<ContextType>;