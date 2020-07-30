// THIS IS A GENERATED FILE, DO NOT MODIFY
// tslint:disable
import { Context } from './util';
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };



import { ObjectID } from 'mongodb';
export type DayDbObject = {
  _id: ObjectID,
  season?: Maybe<SeasonDbObject['_id']>,
  visitDate: Date,
  reeceDate: Date,
  assignedStreets: Array<StreetDbObject['_id']>,
};

export type EntranceDbObject = {
  _id: ObjectID,
  house?: Maybe<HouseDbObject['_id']>,
  visitState: RecordState,
  reeceState: RecordState,
  comment?: Maybe<string>,
  pastoralVisit?: Maybe<PastoralVisitDbObject['_id']>,
};

export type HouseDbObject = {
  _id: ObjectID,
  number: string,
  street?: Maybe<StreetDbObject['_id']>,
};

export type PastoralVisitDbObject = {
  _id: ObjectID,
  day?: Maybe<DayDbObject['_id']>,
  priest?: Maybe<UserDbObject['_id']>,
  acolytes: Array<UserDbObject['_id']>,
  hour: number,
};

export type SeasonDbObject = {
  _id: ObjectID,
  year: number,
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
  DateTime: Date;
};











export type Mutation = {
  addDay: Day;
  addEntrance: Entrance;
  addHouse?: Maybe<House>;
  addPastoralVisit: PastoralVisit;
  addSeason: Season;
  addStreet?: Maybe<Street>;
  login: Scalars['String'];
  register: Scalars['String'];
  updateDay?: Maybe<Day>;
  updateEntrance?: Maybe<Entrance>;
  updatePastoralVisit?: Maybe<PastoralVisit>;
  updateStreet?: Maybe<Street>;
  verifyEmail: Scalars['Boolean'];
};


export type MutationAddDayArgs = {
  input: AddDayInput;
};


export type MutationAddEntranceArgs = {
  input: AddEntranceInput;
};


export type MutationAddHouseArgs = {
  input: AddHouseInput;
};


export type MutationAddPastoralVisitArgs = {
  input: AddPastoralVisitInput;
};


export type MutationAddSeasonArgs = {
  input: AddSeasonInput;
};


export type MutationAddStreetArgs = {
  input: AddStreetInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUpdateDayArgs = {
  input: UpdateDayInput;
};


export type MutationUpdateEntranceArgs = {
  input: UpdateEntranceInput;
};


export type MutationUpdatePastoralVisitArgs = {
  input: UpdatePastoralVisitInput;
};


export type MutationUpdateStreetArgs = {
  input: UpdateStreetInput;
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};

export type Query = {
  day?: Maybe<Day>;
  days: Array<Maybe<Day>>;
  entrance?: Maybe<Entrance>;
  entrances: Array<Entrance>;
  house?: Maybe<House>;
  me: User;
  pastoralVisit?: Maybe<PastoralVisit>;
  season?: Maybe<Season>;
  seasons: Array<Season>;
  street?: Maybe<Street>;
  streets: Array<Street>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryDayArgs = {
  input: FindOneInput;
};


export type QueryDaysArgs = {
  input: DaysInput;
};


export type QueryEntranceArgs = {
  input: FindOneInput;
};


export type QueryHouseArgs = {
  input: FindOneInput;
};


export type QueryPastoralVisitArgs = {
  input: FindOneInput;
};


export type QuerySeasonArgs = {
  input: FindOneInput;
};


export type QueryStreetArgs = {
  input: FindOneInput;
};


export type QueryUserArgs = {
  input: FindOneInput;
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type VerifyEmailInput = {
  token: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Day = {
  id: Scalars['ID'];
  season?: Maybe<Season>;
  visitDate: Scalars['DateTime'];
  reeceDate: Scalars['DateTime'];
  assignedStreets: Array<Street>;
  unusedHouses: Array<House>;
  pastoralVisits: Array<PastoralVisit>;
};

export type DaysInput = {
  season: Scalars['String'];
};

export type AddDayInput = {
  season: Scalars['String'];
  visitDate: Scalars['String'];
  reeceDate: Scalars['String'];
  assignedStreets?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UpdateDayInput = {
  id: Scalars['String'];
  visitDate?: Maybe<Scalars['String']>;
  reeceDate?: Maybe<Scalars['String']>;
  assignedStreets?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Entrance = {
  id: Scalars['ID'];
  house?: Maybe<House>;
  visitState: RecordState;
  reeceState: RecordState;
  comment?: Maybe<Scalars['String']>;
  pastoralVisit?: Maybe<PastoralVisit>;
};

export type AddEntranceInput = {
  house: Scalars['String'];
  pastoralVisit: Scalars['String'];
  comment?: Maybe<Scalars['String']>;
};

export type UpdateEntranceInput = {
  id: Scalars['String'];
  visitState?: Maybe<RecordState>;
  reeceState?: Maybe<RecordState>;
  comment?: Maybe<Scalars['String']>;
  pastoralVisit?: Maybe<Scalars['String']>;
};

export enum RecordState {
  Unknown = 'UNKNOWN',
  Accepted = 'ACCEPTED',
  Rejected = 'REJECTED',
  Uncertain = 'UNCERTAIN'
}

export type House = {
  id: Scalars['ID'];
  number: Scalars['String'];
  street?: Maybe<Street>;
};

export type AddHouseInput = {
  number: Scalars['String'];
  street: Scalars['String'];
};

export type PastoralVisit = {
  id: Scalars['ID'];
  day?: Maybe<Day>;
  priest?: Maybe<User>;
  acolytes: Array<User>;
  entrances: Array<Entrance>;
  hour: Scalars['Int'];
};

export type AddPastoralVisitInput = {
  priest: Scalars['String'];
  acolytes: Array<Scalars['String']>;
  hour: Scalars['Int'];
  day: Scalars['String'];
};

export type UpdatePastoralVisitInput = {
  id: Scalars['String'];
  priest?: Maybe<Scalars['String']>;
  hour?: Maybe<Scalars['Int']>;
  acolytes?: Maybe<Array<Scalars['String']>>;
};

export type Season = {
  id: Scalars['ID'];
  year: Scalars['Int'];
  days: Array<Day>;
};

export type AddSeasonInput = {
  year: Scalars['Int'];
};


export type FindOneInput = {
  id: Scalars['String'];
};

export type Street = {
  id: Scalars['ID'];
  name: Scalars['String'];
  houses: Array<House>;
};

export type AddStreetInput = {
  name: Scalars['String'];
};

export type UpdateStreetInput = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type User = {
  id: Scalars['ID'];
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
  Mutation: ResolverTypeWrapper<{}>,
  Query: ResolverTypeWrapper<{}>,
  RegisterInput: RegisterInput,
  VerifyEmailInput: VerifyEmailInput,
  LoginInput: LoginInput,
  Day: ResolverTypeWrapper<DayDbObject>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  DaysInput: DaysInput,
  AddDayInput: AddDayInput,
  UpdateDayInput: UpdateDayInput,
  Entrance: ResolverTypeWrapper<EntranceDbObject>,
  AddEntranceInput: AddEntranceInput,
  UpdateEntranceInput: UpdateEntranceInput,
  RecordState: RecordState,
  House: ResolverTypeWrapper<HouseDbObject>,
  AddHouseInput: AddHouseInput,
  PastoralVisit: ResolverTypeWrapper<PastoralVisitDbObject>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  AddPastoralVisitInput: AddPastoralVisitInput,
  UpdatePastoralVisitInput: UpdatePastoralVisitInput,
  Season: ResolverTypeWrapper<SeasonDbObject>,
  AddSeasonInput: AddSeasonInput,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  FindOneInput: FindOneInput,
  Street: ResolverTypeWrapper<StreetDbObject>,
  AddStreetInput: AddStreetInput,
  UpdateStreetInput: UpdateStreetInput,
  User: ResolverTypeWrapper<UserDbObject>,
  Role: Role,
  AdditionalEntityFields: AdditionalEntityFields,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  Mutation: {},
  Query: {},
  RegisterInput: RegisterInput,
  VerifyEmailInput: VerifyEmailInput,
  LoginInput: LoginInput,
  Day: DayDbObject,
  ID: Scalars['ID'],
  DaysInput: DaysInput,
  AddDayInput: AddDayInput,
  UpdateDayInput: UpdateDayInput,
  Entrance: EntranceDbObject,
  AddEntranceInput: AddEntranceInput,
  UpdateEntranceInput: UpdateEntranceInput,
  RecordState: RecordState,
  House: HouseDbObject,
  AddHouseInput: AddHouseInput,
  PastoralVisit: PastoralVisitDbObject,
  Int: Scalars['Int'],
  AddPastoralVisitInput: AddPastoralVisitInput,
  UpdatePastoralVisitInput: UpdatePastoralVisitInput,
  Season: SeasonDbObject,
  AddSeasonInput: AddSeasonInput,
  DateTime: Scalars['DateTime'],
  FindOneInput: FindOneInput,
  Street: StreetDbObject,
  AddStreetInput: AddStreetInput,
  UpdateStreetInput: UpdateStreetInput,
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

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addDay?: Resolver<ResolversTypes['Day'], ParentType, ContextType, RequireFields<MutationAddDayArgs, 'input'>>,
  addEntrance?: Resolver<ResolversTypes['Entrance'], ParentType, ContextType, RequireFields<MutationAddEntranceArgs, 'input'>>,
  addHouse?: Resolver<Maybe<ResolversTypes['House']>, ParentType, ContextType, RequireFields<MutationAddHouseArgs, 'input'>>,
  addPastoralVisit?: Resolver<ResolversTypes['PastoralVisit'], ParentType, ContextType, RequireFields<MutationAddPastoralVisitArgs, 'input'>>,
  addSeason?: Resolver<ResolversTypes['Season'], ParentType, ContextType, RequireFields<MutationAddSeasonArgs, 'input'>>,
  addStreet?: Resolver<Maybe<ResolversTypes['Street']>, ParentType, ContextType, RequireFields<MutationAddStreetArgs, 'input'>>,
  login?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>,
  register?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'input'>>,
  updateDay?: Resolver<Maybe<ResolversTypes['Day']>, ParentType, ContextType, RequireFields<MutationUpdateDayArgs, 'input'>>,
  updateEntrance?: Resolver<Maybe<ResolversTypes['Entrance']>, ParentType, ContextType, RequireFields<MutationUpdateEntranceArgs, 'input'>>,
  updatePastoralVisit?: Resolver<Maybe<ResolversTypes['PastoralVisit']>, ParentType, ContextType, RequireFields<MutationUpdatePastoralVisitArgs, 'input'>>,
  updateStreet?: Resolver<Maybe<ResolversTypes['Street']>, ParentType, ContextType, RequireFields<MutationUpdateStreetArgs, 'input'>>,
  verifyEmail?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationVerifyEmailArgs, 'input'>>,
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  day?: Resolver<Maybe<ResolversTypes['Day']>, ParentType, ContextType, RequireFields<QueryDayArgs, 'input'>>,
  days?: Resolver<Array<Maybe<ResolversTypes['Day']>>, ParentType, ContextType, RequireFields<QueryDaysArgs, 'input'>>,
  entrance?: Resolver<Maybe<ResolversTypes['Entrance']>, ParentType, ContextType, RequireFields<QueryEntranceArgs, 'input'>>,
  entrances?: Resolver<Array<ResolversTypes['Entrance']>, ParentType, ContextType>,
  house?: Resolver<Maybe<ResolversTypes['House']>, ParentType, ContextType, RequireFields<QueryHouseArgs, 'input'>>,
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  pastoralVisit?: Resolver<Maybe<ResolversTypes['PastoralVisit']>, ParentType, ContextType, RequireFields<QueryPastoralVisitArgs, 'input'>>,
  season?: Resolver<Maybe<ResolversTypes['Season']>, ParentType, ContextType, RequireFields<QuerySeasonArgs, 'input'>>,
  seasons?: Resolver<Array<ResolversTypes['Season']>, ParentType, ContextType>,
  street?: Resolver<Maybe<ResolversTypes['Street']>, ParentType, ContextType, RequireFields<QueryStreetArgs, 'input'>>,
  streets?: Resolver<Array<ResolversTypes['Street']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'input'>>,
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>,
}>;

export type DayResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Day'] = ResolversParentTypes['Day']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  season?: Resolver<Maybe<ResolversTypes['Season']>, ParentType, ContextType>,
  visitDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  reeceDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  assignedStreets?: Resolver<Array<ResolversTypes['Street']>, ParentType, ContextType>,
  unusedHouses?: Resolver<Array<ResolversTypes['House']>, ParentType, ContextType>,
  pastoralVisits?: Resolver<Array<ResolversTypes['PastoralVisit']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type EntranceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Entrance'] = ResolversParentTypes['Entrance']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  house?: Resolver<Maybe<ResolversTypes['House']>, ParentType, ContextType>,
  visitState?: Resolver<ResolversTypes['RecordState'], ParentType, ContextType>,
  reeceState?: Resolver<ResolversTypes['RecordState'], ParentType, ContextType>,
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  pastoralVisit?: Resolver<Maybe<ResolversTypes['PastoralVisit']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type HouseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['House'] = ResolversParentTypes['House']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  number?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  street?: Resolver<Maybe<ResolversTypes['Street']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type PastoralVisitResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PastoralVisit'] = ResolversParentTypes['PastoralVisit']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  day?: Resolver<Maybe<ResolversTypes['Day']>, ParentType, ContextType>,
  priest?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  acolytes?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  entrances?: Resolver<Array<ResolversTypes['Entrance']>, ParentType, ContextType>,
  hour?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type SeasonResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Season'] = ResolversParentTypes['Season']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  days?: Resolver<Array<ResolversTypes['Day']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type StreetResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Street'] = ResolversParentTypes['Street']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  houses?: Resolver<Array<ResolversTypes['House']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  confirmed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Day?: DayResolvers<ContextType>,
  Entrance?: EntranceResolvers<ContextType>,
  House?: HouseResolvers<ContextType>,
  PastoralVisit?: PastoralVisitResolvers<ContextType>,
  Season?: SeasonResolvers<ContextType>,
  DateTime?: GraphQLScalarType,
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