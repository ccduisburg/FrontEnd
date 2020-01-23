import { useReducer, useEffect } from 'react';

import { OperationVariables } from 'apollo-client';
import { GraphQlPaginationInput, GraphQlPaginationResult, Maybe } from '../../data/datatypes';
import { DataTablePaginationDataTableInterface } from '../DataTable/types';
import { paginationReducer } from '../DataTable/Pagination';

interface DataTableNavigatorVariables extends OperationVariables {
    pagination?: GraphQlPaginationInput | null | undefined;
  }
  /**
   * Zuständig dafür einen generischen TableNavigator zurückzugeben auf den der DataTable zurückgreifen kann um Daten
   * je nach Seite zu setzen
   *
   * @param variables  Variables {variables} die über den eigentlichen useQuery hook zurückgegeben werden
   * @param data Muss das Ergebnis'feld' aus dem {data} 'useQuery Hook' Objekt erhalten, welches dann instanceof GrapQLPaginationResult sein muss
   * @param fetchMore {fetchMore} des useQuery Hooks
   */
  export default function useDataTableWithPagination(
    variables: DataTableNavigatorVariables,
    data: Maybe<GraphQlPaginationResult>,
    fetchMore: (param: any) => Promise<any>,
  ): DataTablePaginationDataTableInterface {
    const [pagination, dispatchPagination] = useReducer(
      paginationReducer,
      (variables && variables.pagination) || { offsetPage: 0, pageSize: 20 },
    );
  
    const pageLoadMore = (newInput: GraphQlPaginationInput): Promise<any> => {
      return fetchMore({
        variables: {
          ...variables,
          pagination: { ...newInput },
        },
        updateQuery: (prevResult: any, { fetchMoreResult }: any) => {
          console.log(prevResult);
          let newResult = { ...prevResult };
          if (fetchMoreResult) {
            newResult = { ...fetchMoreResult };
          }
          return { ...newResult };
        },
      });
    };
  
    useEffect(() => {
      console.log('pagination');
      pageLoadMore(pagination);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination]);
  
    const pageInfo = data ? data.pageInfo : null;
    return {
      first: pageInfo && pageInfo.number ? pageInfo.number : 0,
      recordCount:
        (pageInfo && pageInfo.totalPages ? pageInfo.totalPages : 1) *
        (pageInfo && pageInfo.size ? pageInfo.size : 20),
      totalPages: pageInfo && pageInfo.totalPages ? pageInfo.totalPages : 1,
      pageSize: pageInfo && pageInfo.size ? pageInfo.size : 20,
      setPage: first => {
        dispatchPagination({
          type: 'SET_PAGE',
          page: first,
        });
      },
      nextPage: () => {
        dispatchPagination({
          type: 'FORWARD',
          totalPages: pageInfo && pageInfo.totalPages ? pageInfo.totalPages : 1,
        });
      },
      previosPage: () => {
        dispatchPagination({
          type: 'BACK',
          totalPages: pageInfo && pageInfo.totalPages ? pageInfo.totalPages : 1,
        });
      },
      firstPage: () => {
        dispatchPagination({ type: 'FIRST' });
      },
      lastPage: () => {
        dispatchPagination({
          type: 'LAST',
          totalPages: pageInfo && pageInfo.totalPages ? pageInfo.totalPages : 1,
        });
      },
      onPageSizeChanged: () => {
        // TODO !!
        // eslint-disable-next-line no-param-reassign
        // input.pageSize = pageSize;
      },
    };
  }
  