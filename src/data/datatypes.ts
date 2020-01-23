export type Maybe<T> = T | null | undefined;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Date: any,
};



export type GraphQlPaginationInput = {
  offsetPage?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  sorts?: Maybe<Array<Maybe<GraphQlPaginationInputSort>>>,
};

export type GraphQlPaginationInputSort = {
  fieldName: Scalars['String'],
  sortDirection?: Maybe<SortDirection>,
};

export type GraphQlPaginationPageInfo = {
   __typename?: 'GraphQLPaginationPageInfo',
  totalElements: Scalars['Int'],
  totalPages: Scalars['Int'],
  number: Scalars['Int'],
  size: Scalars['Int'],
};

export type GraphQlPaginationResult = {
  pageInfo: GraphQlPaginationPageInfo,
  result: Array<IdEntity>,
};

export type IdEntity = {
  id: Scalars['ID'],
};

export type InputPerson = {
  vorname: Scalars['String'],
  nachname: Scalars['String'],
  skill?: Maybe<Scalars['String']>,
  geburtsdatum?: Maybe<Scalars['Date']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  savePerson: Person,
  deletePerson: Scalars['Boolean'],
  updatePerson: Person,
};


export type MutationSavePersonArgs = {
  vorname?: Maybe<Scalars['String']>,
  nachname?: Maybe<Scalars['String']>,
  skill?: Maybe<Scalars['String']>,
  geburtsdatum?: Maybe<Scalars['Date']>
};


export type MutationDeletePersonArgs = {
  id?: Maybe<Scalars['Int']>
};


export type MutationUpdatePersonArgs = {
  id?: Maybe<Scalars['Int']>,
  pr?: Maybe<InputPerson>
};

export type Person = IdEntity & {
   __typename?: 'Person',
  id: Scalars['ID'],
  vorname: Scalars['String'],
  nachname: Scalars['String'],
  skill?: Maybe<Scalars['String']>,
  geburtsdatum?: Maybe<Scalars['Date']>,
};

export type PersonConnection = GraphQlPaginationResult & {
   __typename?: 'PersonConnection',
  pageInfo: GraphQlPaginationPageInfo,
  result: Array<Person>,
};

export type Query = {
   __typename?: 'Query',
  findPersonlistBy?: Maybe<PersonConnection>,
};


export type QueryFindPersonlistByArgs = {
  vorname?: Maybe<Scalars['String']>,
  nachname?: Maybe<Scalars['String']>,
  skill?: Maybe<Scalars['String']>,
  geburtsdatum?: Maybe<Scalars['Date']>,
  pagination?: Maybe<GraphQlPaginationInput>
};

export enum SortDirection {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING'
}
