import React from "react";
import ReactDOM from "react-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import "semantic-ui-css/semantic.min.css";

import Routes from "./Routes";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  fetchOptions: {
    credentials: "include",
  },
  request: async (operation) => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    console.log(refreshToken);
    operation.setContext({
      headers: {
        "x-token": token ? `${token}` : "",
        "x-refreshToken": refreshToken ? `${refreshToken}` : "",
      },
    });
  },

  // response: ({ response: { headers } }) => {
  //   const token = headers.get("x-token");
  //   const refreshToken = headers.get("x-refresh-token");

  //   if (token) localStorage.setItem("token", token);
  //   if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
  // },
});

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById("root"));

// import ApolloClient from 'apollo-boost';

// const client = new ApolloClient({
//   uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql',

//   request: async (operation) => {

//   clientState: {
//     defaults: {
//       isConnected: true
//     },
//     resolvers: {
//       Mutation: {
//         updateNetworkStatus: (_, { isConnected }, { cache }) => {
//           cache.writeData({ data: { isConnected }});
//           return null;
//         }
//       }
//     }
//   },
//   cacheRedirects: {
//     Query: {
//       movie: (_, { id }, { getCacheKey }) =>
//         getCacheKey({ __typename: 'Movie', id });
//     }
//   }
// });
