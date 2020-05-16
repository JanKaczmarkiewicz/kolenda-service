import { gql } from "apollo-server";

export const StreetFragment = gql`
  fragment StreetFragment on Street {
    id
    name
    houses {
      id
    }
  }
`;

export const UserFragment = gql`
  fragment UserFragment on User {
    username
    email
    confirmed
    id
  }
`;

export const SeasonFragment = gql`
  fragment SeasonFragment on Season {
    year
    id
  }
`;

export const HouseFragment = gql`
  fragment HouseFragment on House {
    id
    number
    street {
      id
    }
  }
`;

export const EntryFragment = gql`
  fragment EntryFragment on Entry {
    id
    visitState
    reeceState
    comment
    house {
      id
    }
    pastoralVisit {
      id
    }
  }
`;

export const PastoralVisitFragment = gql`
  fragment PastoralVisitFragment on PastoralVisit {
    id
    priest {
      id
    }
    acolytes {
      id
    }
    visitTime
    reeceTime
    season {
      id
    }
  }
`;
