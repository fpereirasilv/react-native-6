import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Main from "./src/screens/Main";

const client = new ApolloClient({
  uri: "https://graphql-pokemon.now.sh/"
});

export default App = () => {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
};
