import { ApolloServer, gql } from "apollo-server";
import * as fs from "fs";
import {
  NonNegativeIntResolver,
  typeDefs as scalarTypeDefs,
} from "graphql-scalars";

const typeDefs = gql`
  ${fs.readFileSync(__dirname.concat("/schema.gql"), "utf8")}
`;

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const resolvers = {
  Query: {
    books: () => books,
    nint: () => -10.9,
  },
  NonNegativeInt: NonNegativeIntResolver,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(scalarTypeDefs);
  console.log(`🚀  Server ready at ${url}`);
});
