import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlBaseQuery } from './graphqlBaseQuery';
import { GET_FORM, GET_FORMS, GET_RESPONSES, CREATE_FORM, SUBMIT_RESPONSE } from '../graphql/operations';
import type {
  CreateFormMutation,
  CreateFormMutationVariables,
  GetFormQuery,
  GetFormQueryVariables,
  GetFormsQuery,
  GetResponsesQuery,
  GetResponsesQueryVariables,
  SubmitResponseMutation,
  SubmitResponseMutationVariables,
} from '../graphql/generated/graphql';

const baseUrl = import.meta.env.VITE_GRAPHQL_URL ?? 'http://localhost:4000/graphql';

export const formsApi = createApi({
  reducerPath: 'formsApi',
  baseQuery: graphqlBaseQuery(baseUrl),
  tagTypes: ['Forms', 'Responses', 'Form'],
  endpoints: (builder) => ({
    getForms: builder.query<GetFormsQuery['forms'], void>({
      query: () => ({ document: GET_FORMS }),
      transformResponse: (response: GetFormsQuery) => response.forms,
      providesTags: (result) =>
        result
          ? [
              ...result.map((form) => ({ type: 'Form' as const, id: form.id })),
              { type: 'Forms' as const, id: 'LIST' },
            ]
          : [{ type: 'Forms' as const, id: 'LIST' }],
    }),
    getForm: builder.query<GetFormQuery['form'], string>({
      query: (id) => ({ document: GET_FORM, variables: { id } satisfies GetFormQueryVariables }),
      transformResponse: (response: GetFormQuery) => response.form,
      providesTags: (_result, _error, id) => [{ type: 'Form', id }],
    }),
    getResponses: builder.query<GetResponsesQuery['responses'], string>({
      query: (formId) => ({
        document: GET_RESPONSES,
        variables: { formId } satisfies GetResponsesQueryVariables,
      }),
      transformResponse: (response: GetResponsesQuery) => response.responses,
      providesTags: (_result, _error, formId) => [{ type: 'Responses', id: formId }],
    }),
    createForm: builder.mutation<CreateFormMutation['createForm'], CreateFormMutationVariables>({
      query: (variables) => ({ document: CREATE_FORM, variables }),
      transformResponse: (response: CreateFormMutation) => response.createForm,
      invalidatesTags: [{ type: 'Forms', id: 'LIST' }],
    }),
    submitResponse: builder.mutation<SubmitResponseMutation['submitResponse'], SubmitResponseMutationVariables>({
      query: (variables) => ({ document: SUBMIT_RESPONSE, variables }),
      transformResponse: (response: SubmitResponseMutation) => response.submitResponse,
      invalidatesTags: (_result, _error, variables) => [{ type: 'Responses', id: variables.formId }],
    }),
  }),
});

export const {
  useGetFormsQuery,
  useGetFormQuery,
  useGetResponsesQuery,
  useCreateFormMutation,
  useSubmitResponseMutation,
} = formsApi;
