import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type CreateItemInput = {
  cost: Scalars['Int'];
  description: Scalars['String'];
  title: Scalars['String'];
};

export type CreateShipmentInput = {
  title: Scalars['String'];
};

export type Item = {
  __typename?: 'Item';
  cost: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['String'];
  shipment?: Maybe<Shipment>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createItem: Item;
  createShipment: Shipment;
  updateItem: Item;
  updateShipment: Shipment;
};


export type MutationCreateItemArgs = {
  data: CreateItemInput;
};


export type MutationCreateShipmentArgs = {
  data: CreateShipmentInput;
};


export type MutationUpdateItemArgs = {
  data: UpdateItemInput;
  id: Scalars['String'];
};


export type MutationUpdateShipmentArgs = {
  data: UpdateShipmentInput;
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  item: Item;
  items: Array<Item>;
  shipment: Shipment;
  shipments: Array<Shipment>;
  uptime: Scalars['Float'];
};


export type QueryItemArgs = {
  id: Scalars['String'];
};


export type QueryShipmentArgs = {
  id: Scalars['String'];
};

export type Shipment = {
  __typename?: 'Shipment';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  items?: Maybe<Array<Item>>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UpdateItemInput = {
  cost: Scalars['Int'];
  description: Scalars['String'];
  title: Scalars['String'];
};

export type UpdateShipmentInput = {
  title: Scalars['String'];
};

export type ItemShipmentFragment = { __typename?: 'Item', id: string, title: string, description: string, cost: number, createdAt: any, updatedAt: any, shipment?: { __typename?: 'Shipment', id: string, title: string, createdAt: any, updatedAt: any } | null | undefined };

export type ShipmentItemFragment = { __typename?: 'Shipment', id: string, title: string, createdAt: any, updatedAt: any, items?: Array<{ __typename?: 'Item', id: string, title: string, description: string, cost: number, createdAt: any, updatedAt: any }> | null | undefined };

export type CreateItemMutationVariables = Exact<{
  data: CreateItemInput;
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem: { __typename?: 'Item', id: string, title: string, description: string, cost: number, createdAt: any, updatedAt: any, shipment?: { __typename?: 'Shipment', id: string, title: string, createdAt: any, updatedAt: any } | null | undefined } };

export type ItemQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ItemQuery = { __typename?: 'Query', item: { __typename?: 'Item', id: string, title: string, description: string, cost: number, createdAt: any, updatedAt: any, shipment?: { __typename?: 'Shipment', id: string, title: string, createdAt: any, updatedAt: any } | null | undefined } };

export type ShipmentQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ShipmentQuery = { __typename?: 'Query', shipment: { __typename?: 'Shipment', id: string, title: string, createdAt: any, updatedAt: any, items?: Array<{ __typename?: 'Item', id: string, title: string, description: string, cost: number, createdAt: any, updatedAt: any }> | null | undefined } };

export type ShipmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type ShipmentsQuery = { __typename?: 'Query', shipments: Array<{ __typename?: 'Shipment', id: string, title: string, createdAt: any, updatedAt: any, items?: Array<{ __typename?: 'Item', id: string, title: string, description: string, cost: number, createdAt: any, updatedAt: any }> | null | undefined }> };

export type ItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type ItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: string, title: string, description: string, cost: number, createdAt: any, updatedAt: any, shipment?: { __typename?: 'Shipment', id: string, title: string, createdAt: any, updatedAt: any } | null | undefined }> };

export const ItemShipmentFragmentDoc = gql`
    fragment ItemShipment on Item {
  id
  title
  description
  cost
  createdAt
  updatedAt
  shipment {
    id
    title
    createdAt
    updatedAt
  }
}
    `;
export const ShipmentItemFragmentDoc = gql`
    fragment ShipmentItem on Shipment {
  id
  title
  createdAt
  updatedAt
  items {
    id
    title
    description
    cost
    createdAt
    updatedAt
  }
}
    `;
export const CreateItemDocument = gql`
    mutation CreateItem($data: CreateItemInput!) {
  createItem(data: $data) {
    ...ItemShipment
  }
}
    ${ItemShipmentFragmentDoc}`;
export type CreateItemMutationFn = Apollo.MutationFunction<CreateItemMutation, CreateItemMutationVariables>;

/**
 * __useCreateItemMutation__
 *
 * To run a mutation, you first call `useCreateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createItemMutation, { data, loading, error }] = useCreateItemMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateItemMutation(baseOptions?: Apollo.MutationHookOptions<CreateItemMutation, CreateItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument, options);
      }
export type CreateItemMutationHookResult = ReturnType<typeof useCreateItemMutation>;
export type CreateItemMutationResult = Apollo.MutationResult<CreateItemMutation>;
export type CreateItemMutationOptions = Apollo.BaseMutationOptions<CreateItemMutation, CreateItemMutationVariables>;
export const ItemDocument = gql`
    query Item($id: String!) {
  item(id: $id) {
    ...ItemShipment
  }
}
    ${ItemShipmentFragmentDoc}`;

/**
 * __useItemQuery__
 *
 * To run a query within a React component, call `useItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useItemQuery(baseOptions: Apollo.QueryHookOptions<ItemQuery, ItemQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ItemQuery, ItemQueryVariables>(ItemDocument, options);
      }
export function useItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ItemQuery, ItemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ItemQuery, ItemQueryVariables>(ItemDocument, options);
        }
export type ItemQueryHookResult = ReturnType<typeof useItemQuery>;
export type ItemLazyQueryHookResult = ReturnType<typeof useItemLazyQuery>;
export type ItemQueryResult = Apollo.QueryResult<ItemQuery, ItemQueryVariables>;
export const ShipmentDocument = gql`
    query Shipment($id: String!) {
  shipment(id: $id) {
    ...ShipmentItem
  }
}
    ${ShipmentItemFragmentDoc}`;

/**
 * __useShipmentQuery__
 *
 * To run a query within a React component, call `useShipmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useShipmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShipmentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useShipmentQuery(baseOptions: Apollo.QueryHookOptions<ShipmentQuery, ShipmentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShipmentQuery, ShipmentQueryVariables>(ShipmentDocument, options);
      }
export function useShipmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShipmentQuery, ShipmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShipmentQuery, ShipmentQueryVariables>(ShipmentDocument, options);
        }
export type ShipmentQueryHookResult = ReturnType<typeof useShipmentQuery>;
export type ShipmentLazyQueryHookResult = ReturnType<typeof useShipmentLazyQuery>;
export type ShipmentQueryResult = Apollo.QueryResult<ShipmentQuery, ShipmentQueryVariables>;
export const ShipmentsDocument = gql`
    query Shipments {
  shipments {
    ...ShipmentItem
  }
}
    ${ShipmentItemFragmentDoc}`;

/**
 * __useShipmentsQuery__
 *
 * To run a query within a React component, call `useShipmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useShipmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShipmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useShipmentsQuery(baseOptions?: Apollo.QueryHookOptions<ShipmentsQuery, ShipmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShipmentsQuery, ShipmentsQueryVariables>(ShipmentsDocument, options);
      }
export function useShipmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShipmentsQuery, ShipmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShipmentsQuery, ShipmentsQueryVariables>(ShipmentsDocument, options);
        }
export type ShipmentsQueryHookResult = ReturnType<typeof useShipmentsQuery>;
export type ShipmentsLazyQueryHookResult = ReturnType<typeof useShipmentsLazyQuery>;
export type ShipmentsQueryResult = Apollo.QueryResult<ShipmentsQuery, ShipmentsQueryVariables>;
export const ItemsDocument = gql`
    query Items {
  items {
    ...ItemShipment
  }
}
    ${ItemShipmentFragmentDoc}`;

/**
 * __useItemsQuery__
 *
 * To run a query within a React component, call `useItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useItemsQuery(baseOptions?: Apollo.QueryHookOptions<ItemsQuery, ItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ItemsQuery, ItemsQueryVariables>(ItemsDocument, options);
      }
export function useItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ItemsQuery, ItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ItemsQuery, ItemsQueryVariables>(ItemsDocument, options);
        }
export type ItemsQueryHookResult = ReturnType<typeof useItemsQuery>;
export type ItemsLazyQueryHookResult = ReturnType<typeof useItemsLazyQuery>;
export type ItemsQueryResult = Apollo.QueryResult<ItemsQuery, ItemsQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    