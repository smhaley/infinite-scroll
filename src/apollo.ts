import { InMemoryCache, gql } from "@apollo/client";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        characters: {
          keyArgs: false,
          merge(existing, incoming) {
            if (!incoming) return existing;
            if (!existing) return incoming;

            const { results, ...remainingData } = incoming;

            let result = remainingData;
            //combines the existing list with the new char list only
            //pagination index is overwritten by the incoming

            result.results = [...existing.results, ...results];

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

export const GET_CHARACTERS = gql`
  query getChars($page: Int) {
    characters(page: $page) {
      info {
        next
        pages
      }
      results {
        id
        name
        image
        status
        location {
          name
        }
      }
    }
  }
`;
