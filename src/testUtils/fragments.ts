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

export const SeasonFragment = gql`
  fragment SeasonFragment on Season {
    year
    id
  }
`;
