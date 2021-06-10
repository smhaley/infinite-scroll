import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        characters: {
          // Don't cache separate results based on
          // any of this field's arguments.
          keyArgs: false,
          // Concatenate the incoming list items with
          // the existing list items.
          merge(existing, incoming) {
            if (!incoming) return existing;
            if (!existing) return incoming; // existing will be empty the first time

            const { results, ...rest } = incoming;

            let result = rest;
            result.results = [...existing.results, ...results]; // Merge existing items with the items from incoming

            return result;
          },
        },
      },
    },
    Character: {
      fields: {
        name: {
          read(existing) {
            return existing.toUpperCase();
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: cache,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
