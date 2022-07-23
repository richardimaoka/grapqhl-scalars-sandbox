import { ApolloServer, gql } from "apollo-server";
import {
  NonNegativeIntResolver,
  typeDefs as scalarTypeDefs,
} from "graphql-scalars";

const typeDefs = gql`
  scalar NonNegativeInt

  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
    nint: NonNegativeInt
  }
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
