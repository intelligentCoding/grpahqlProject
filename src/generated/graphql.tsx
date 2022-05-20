import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Donation = {
  __typename?: 'Donation';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  donation: Scalars['Float'];
  tip: Scalars['Float'];
  creatorId: Scalars['Float'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  updateDonation: Donation;
  createDonation: Donation;
  deleteDonation: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationUpdateDonationArgs = {
  donation?: Maybe<Scalars['Float']>;
  id: Scalars['Float'];
};


export type MutationCreateDonationArgs = {
  donation: Scalars['Int'];
  tip: Scalars['Int'];
};


export type MutationDeleteDonationArgs = {
  id: Scalars['Float'];
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationLoginArgs = {
  options: LoginInput;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  donations: Array<Donation>;
  donationById?: Maybe<Donation>;
  user?: Maybe<User>;
};


export type QueryDonationByIdArgs = {
  id: Scalars['Float'];
};

export type RegisterInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type CreateDonationMutationVariables = Exact<{
  tip: Scalars['Int'];
  donation: Scalars['Int'];
}>;


export type CreateDonationMutation = (
  { __typename?: 'Mutation' }
  & { createDonation: (
    { __typename?: 'Donation' }
    & Pick<Donation, 'donation'>
  ) }
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'createdAt' | 'id' | 'username'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'createdAt' | 'id' | 'username'>
    )> }
  ) }
);

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);


export const CreateDonationDocument = gql`
    mutation CreateDonation($tip: Int!, $donation: Int!) {
  createDonation(tip: $tip, donation: $donation) {
    donation
  }
}
    `;

export function useCreateDonationMutation() {
  return Urql.useMutation<CreateDonationMutation, CreateDonationMutationVariables>(CreateDonationDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(options: {username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      createdAt
      id
      username
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($firstName: String!, $lastName: String!, $username: String!, $password: String!) {
  register(
    options: {firstName: $firstName, lastName: $lastName, username: $username, password: $password}
  ) {
    errors {
      field
      message
    }
    user {
      createdAt
      id
      username
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UserDocument = gql`
    query User {
  user {
    id
    username
  }
}
    `;

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
};