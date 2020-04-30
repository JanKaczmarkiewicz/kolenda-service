import gql from "graphql-tag";

export const StreetFragment = gql`
  fragment StreetFragment on Street {
    id
    name
    houses {
      id
    }
  }
`;
