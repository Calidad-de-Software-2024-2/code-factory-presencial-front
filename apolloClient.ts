import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://flight-search.greengrass-430a2ace.westus.azurecontainerapps.io/graphql", 
  cache: new InMemoryCache(),
});

export default client;
