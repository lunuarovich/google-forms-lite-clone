import { print, type DocumentNode } from 'graphql';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';

interface GraphqlRequestArgs {
  document: DocumentNode;
  variables?: unknown;
}

interface GraphqlError {
  status: number;
  data: { message: string };
}

export const graphqlBaseQuery = (
  baseUrl: string,
): BaseQueryFn<GraphqlRequestArgs, unknown, GraphqlError> => {
  return async ({ document, variables }) => {
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: print(document),
          variables,
        }),
      });

      const result = (await response.json()) as {
        data?: unknown;
        errors?: Array<{ message: string }>;
      };

      if (!response.ok || result.errors?.length) {
        return {
          error: {
            status: response.status || 500,
            data: { message: result.errors?.[0]?.message ?? 'Unknown GraphQL error' },
          },
        };
      }

      return { data: result.data };
    } catch (error) {
      return {
        error: {
          status: 500,
          data: { message: error instanceof Error ? error.message : 'Network error' },
        },
      };
    }
  };
};
