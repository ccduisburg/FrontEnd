import React from 'react';

import { onError } from 'apollo-link-error';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from '@apollo/react-hooks';
import PersonList from './components/PersonList';
import PersonAdd from './components/PersonAdd';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import PersonUpdate from './components/PersonUpdate';

import Footer from './components/Footer';
import Header from './App/Header';

import Header2 from './App/Header2';
import Home from './App/Home';
const App: React.FC = () => {

  //  const link = new HttpLink({
  //   uri: "http://localhost:8081/graphql"
  // });

  // const client = new ApolloClient({
  //   cache: new InMemoryCache(),
  //   link: link
  // });
  //-------------------------from here-
  const uploadLink = createUploadLink({
    // credentials: 'include',
    uri: process.env.REACT_APP_HTTP_URL,
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache({}),
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError, forward, operation, response }) => {
        if (graphQLErrors) {
          let needsReload = false;
          graphQLErrors.forEach(async err => {
            if (
              err &&
              err.extensions &&
              err.extensions.code &&
              err.extensions.code === 'UNAUTHENTICATED'
            ) {
              apolloClient.resetStore();
              localStorage.removeItem('token');
              localStorage.removeItem('sessionInfo');
              window.location.reload();
              needsReload = true;
            }
          });

          if (!needsReload) {
            if (response) response.errors = graphQLErrors;
            forward(operation);
          }
        }
        if (networkError) {
          // eslint-disable-next-line no-console
          console.error(networkError);
        }
      }),
      authLink.concat(uploadLink),
    ]),
  });

  return (
    <ApolloProvider client={apolloClient}>
      <ApolloHooksProvider client={apolloClient}>
        <Home/>       
        <Footer />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}


export default App;
