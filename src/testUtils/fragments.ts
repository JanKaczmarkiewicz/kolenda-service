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

export const DayFragment = gql`
  fragment DayFragment on Day {
    id
    season {
      id
    }
    visitDate
    reeceDate
    unusedHouses {
      id
    }
    pastoralVisits {
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
    days {
      id
    }
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

export const EntranceFragment = gql`
  fragment EntranceFragment on Entrance {
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
    day {
      id
    }
    acolytes {
      id
    }
  }
`;
