import * as Types from './datatypes';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type PersonfieldsFragment = Pick<Types.Person, 'id' | 'vorname' | 'nachname' | 'skill' | 'geburtsdatum'>;

export type PageInfoFragment = Pick<Types.GraphQlPaginationPageInfo, 'number' | 'size' | 'totalElements' | 'totalPages'>;

export type FindPersonlistByQueryVariables = {
  vorname?: Types.Maybe<Types.Scalars['String']>,
  nachane?: Types.Maybe<Types.Scalars['String']>,
  skill?: Types.Maybe<Types.Scalars['String']>,
  geburtsdatum?: Types.Maybe<Types.Scalars['Date']>,
  pagination?: Types.Maybe<Types.GraphQlPaginationInput>
};


export type FindPersonlistByQuery = { findPersonlistBy: Types.Maybe<{ pageInfo: PageInfoFragment, result: Array<PersonfieldsFragment> }> };

export type RegisterPersonMutationVariables = {
  vorname: Types.Scalars['String'],
  nachname: Types.Scalars['String'],
  skill: Types.Scalars['String'],
  geburtsdatum: Types.Scalars['Date']
};


export type RegisterPersonMutation = { savePerson: PersonfieldsFragment };

export type UpdatePersonMutationVariables = {
  id?: Types.Maybe<Types.Scalars['Int']>,
  input: Types.InputPerson
};


export type UpdatePersonMutation = { updatePerson: PersonfieldsFragment };

export type DeletePersonMutationVariables = {
  id: Types.Scalars['Int']
};


export type DeletePersonMutation = Pick<Types.Mutation, 'deletePerson'>;

export const PersonfieldsFragmentDoc = gql`
    fragment Personfields on Person {
  id
  vorname
  nachname
  skill
  geburtsdatum
}
    `;
export const PageInfoFragmentDoc = gql`
    fragment PageInfo on GraphQLPaginationPageInfo {
  number
  size
  totalElements
  totalPages
}
    `;
export const FindPersonlistByDocument = gql`
    query FindPersonlistBy($vorname: String, $nachane: String, $skill: String, $geburtsdatum: Date, $pagination: GraphQLPaginationInput) {
  findPersonlistBy(vorname: $vorname, nachname: $nachane, skill: $skill, geburtsdatum: $geburtsdatum, pagination: $pagination) {
    pageInfo {
      ...PageInfo
    }
    result {
      ...Personfields
    }
  }
}
    ${PageInfoFragmentDoc}
${PersonfieldsFragmentDoc}`;

/**
 * __useFindPersonlistByQuery__
 *
 * To run a query within a React component, call `useFindPersonlistByQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPersonlistByQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPersonlistByQuery({
 *   variables: {
 *      vorname: // value for 'vorname'
 *      nachane: // value for 'nachane'
 *      skill: // value for 'skill'
 *      geburtsdatum: // value for 'geburtsdatum'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useFindPersonlistByQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindPersonlistByQuery, FindPersonlistByQueryVariables>) {
        return ApolloReactHooks.useQuery<FindPersonlistByQuery, FindPersonlistByQueryVariables>(FindPersonlistByDocument, baseOptions);
      }
export function useFindPersonlistByLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindPersonlistByQuery, FindPersonlistByQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindPersonlistByQuery, FindPersonlistByQueryVariables>(FindPersonlistByDocument, baseOptions);
        }
export type FindPersonlistByQueryHookResult = ReturnType<typeof useFindPersonlistByQuery>;
export type FindPersonlistByLazyQueryHookResult = ReturnType<typeof useFindPersonlistByLazyQuery>;
export type FindPersonlistByQueryResult = ApolloReactCommon.QueryResult<FindPersonlistByQuery, FindPersonlistByQueryVariables>;
export const RegisterPersonDocument = gql`
    mutation RegisterPerson($vorname: String!, $nachname: String!, $skill: String!, $geburtsdatum: Date!) {
  savePerson(vorname: $vorname, nachname: $nachname, skill: $skill, geburtsdatum: $geburtsdatum) {
    ...Personfields
  }
}
    ${PersonfieldsFragmentDoc}`;

/**
 * __useRegisterPersonMutation__
 *
 * To run a mutation, you first call `useRegisterPersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterPersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerPersonMutation, { data, loading, error }] = useRegisterPersonMutation({
 *   variables: {
 *      vorname: // value for 'vorname'
 *      nachname: // value for 'nachname'
 *      skill: // value for 'skill'
 *      geburtsdatum: // value for 'geburtsdatum'
 *   },
 * });
 */
export function useRegisterPersonMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterPersonMutation, RegisterPersonMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterPersonMutation, RegisterPersonMutationVariables>(RegisterPersonDocument, baseOptions);
      }
export type RegisterPersonMutationHookResult = ReturnType<typeof useRegisterPersonMutation>;
export type RegisterPersonMutationResult = ApolloReactCommon.MutationResult<RegisterPersonMutation>;
export type RegisterPersonMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterPersonMutation, RegisterPersonMutationVariables>;
export const UpdatePersonDocument = gql`
    mutation updatePerson($id: Int, $input: InputPerson!) {
  updatePerson(id: $id, pr: $input) {
    ...Personfields
  }
}
    ${PersonfieldsFragmentDoc}`;

/**
 * __useUpdatePersonMutation__
 *
 * To run a mutation, you first call `useUpdatePersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePersonMutation, { data, loading, error }] = useUpdatePersonMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePersonMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePersonMutation, UpdatePersonMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdatePersonMutation, UpdatePersonMutationVariables>(UpdatePersonDocument, baseOptions);
      }
export type UpdatePersonMutationHookResult = ReturnType<typeof useUpdatePersonMutation>;
export type UpdatePersonMutationResult = ApolloReactCommon.MutationResult<UpdatePersonMutation>;
export type UpdatePersonMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdatePersonMutation, UpdatePersonMutationVariables>;
export const DeletePersonDocument = gql`
    mutation deletePerson($id: Int!) {
  deletePerson(id: $id)
}
    `;

/**
 * __useDeletePersonMutation__
 *
 * To run a mutation, you first call `useDeletePersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePersonMutation, { data, loading, error }] = useDeletePersonMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePersonMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePersonMutation, DeletePersonMutationVariables>) {
        return ApolloReactHooks.useMutation<DeletePersonMutation, DeletePersonMutationVariables>(DeletePersonDocument, baseOptions);
      }
export type DeletePersonMutationHookResult = ReturnType<typeof useDeletePersonMutation>;
export type DeletePersonMutationResult = ApolloReactCommon.MutationResult<DeletePersonMutation>;
export type DeletePersonMutationOptions = ApolloReactCommon.BaseMutationOptions<DeletePersonMutation, DeletePersonMutationVariables>;