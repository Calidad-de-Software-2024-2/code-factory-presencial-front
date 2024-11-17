import { ApolloClient, InMemoryCache, from, HttpLink } from "@apollo/client";

declare global {
  // eslint-disable-next-line no-var
  var apolloGlobal: ApolloClient<object>;
}

let client: ApolloClient<object>;

if (process.env.NODE_ENV === "production") {
  client = new ApolloClient({
    cache: new InMemoryCache({
      addTypename: false,
    }),

    link: from([
      new HttpLink({
        // eslint-disable-next-line no-nested-ternary

        uri: "https://flight-search.greengrass-430a2ace.westus.azurecontainerapps.io/graphql",
      }),
    ]),

    connectToDevTools: true,
  });
} else {
  if (!global.apolloGlobal) {
    global.apolloGlobal = new ApolloClient({
      cache: new InMemoryCache(),

      link: from([
        new HttpLink({
          uri: "https://flight-search.greengrass-430a2ace.westus.azurecontainerapps.io/graphql",
        }),
      ]),

      connectToDevTools: true,
    });
  }

  client = global.apolloGlobal;
}

export { client };
