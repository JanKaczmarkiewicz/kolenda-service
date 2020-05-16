import { gql } from "apollo-server";
import { UserFragment } from "./fragments";

export const REGISTER = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input)
  }
`;

export const ME = gql`
  query {
    me {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

export const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input)
  }
`;

export const VERIFY_EMAIL = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input)
  }
`;

export const USER = gql`
  query user($input: FindOneInput!) {
    user(input: $input) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

export const USERS = gql`
  query {
    users {
      ...UserFragment
    }
  }
  ${UserFragment}
`;
