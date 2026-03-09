/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query GetForms {\n  forms {\n    id\n    title\n    description\n    createdAt\n    questions {\n      id\n      label\n      type\n      required\n      options\n    }\n  }\n}\n\nquery GetForm($id: ID!) {\n  form(id: $id) {\n    id\n    title\n    description\n    createdAt\n    questions {\n      id\n      label\n      type\n      required\n      options\n    }\n  }\n}\n\nquery GetResponses($formId: ID!) {\n  responses(formId: $formId) {\n    id\n    formId\n    submittedAt\n    answers {\n      questionId\n      value\n    }\n  }\n}\n\nmutation CreateForm($title: String!, $description: String, $questions: [QuestionInput!]) {\n  createForm(title: $title, description: $description, questions: $questions) {\n    id\n    title\n    description\n    createdAt\n    questions {\n      id\n      label\n      type\n      required\n      options\n    }\n  }\n}\n\nmutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {\n  submitResponse(formId: $formId, answers: $answers) {\n    id\n    formId\n    submittedAt\n    answers {\n      questionId\n      value\n    }\n  }\n}": typeof types.GetFormsDocument,
};
const documents: Documents = {
    "query GetForms {\n  forms {\n    id\n    title\n    description\n    createdAt\n    questions {\n      id\n      label\n      type\n      required\n      options\n    }\n  }\n}\n\nquery GetForm($id: ID!) {\n  form(id: $id) {\n    id\n    title\n    description\n    createdAt\n    questions {\n      id\n      label\n      type\n      required\n      options\n    }\n  }\n}\n\nquery GetResponses($formId: ID!) {\n  responses(formId: $formId) {\n    id\n    formId\n    submittedAt\n    answers {\n      questionId\n      value\n    }\n  }\n}\n\nmutation CreateForm($title: String!, $description: String, $questions: [QuestionInput!]) {\n  createForm(title: $title, description: $description, questions: $questions) {\n    id\n    title\n    description\n    createdAt\n    questions {\n      id\n      label\n      type\n      required\n      options\n    }\n  }\n}\n\nmutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {\n  submitResponse(formId: $formId, answers: $answers) {\n    id\n    formId\n    submittedAt\n    answers {\n      questionId\n      value\n    }\n  }\n}": types.GetFormsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetForms {\n  forms {\n    id\n    title\n    description\n    createdAt\n    questions {\n      id\n      label\n      type\n      required\n      options\n    }\n  }\n}\n\nquery GetForm($id: ID!) {\n  form(id: $id) {\n    id\n    title\n    description\n    createdAt\n    questions {\n      id\n      label\n      type\n      required\n      options\n    }\n  }\n}\n\nquery GetResponses($formId: ID!) {\n  responses(formId: $formId) {\n    id\n    formId\n    submittedAt\n    answers {\n      questionId\n      value\n    }\n  }\n}\n\nmutation CreateForm($title: String!, $description: String, $questions: [QuestionInput!]) {\n  createForm(title: $title, description: $description, questions: $questions) {\n    id\n    title\n    description\n    createdAt\n    questions {\n      id\n      label\n      type\n      required\n      options\n    }\n  }\n}\n\nmutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {\n  submitResponse(formId: $formId, answers: $answers) {\n    id\n    formId\n    submittedAt\n    answers {\n      questionId\n      value\n    }\n  }\n}"): (typeof documents)["query GetForms {\n  forms {\n    id\n    title\n    description\n    createdAt\n    questions {\n      id\n      label\n      type\n      required\n      options\n    }\n  }\n}\n\nquery GetForm($id: ID!) {\n  form(id: $id) {\n    id\n    title\n    description\n    createdAt\n    questions {\n      id\n      label\n      type\n      required\n      options\n    }\n  }\n}\n\nquery GetResponses($formId: ID!) {\n  responses(formId: $formId) {\n    id\n    formId\n    submittedAt\n    answers {\n      questionId\n      value\n    }\n  }\n}\n\nmutation CreateForm($title: String!, $description: String, $questions: [QuestionInput!]) {\n  createForm(title: $title, description: $description, questions: $questions) {\n    id\n    title\n    description\n    createdAt\n    questions {\n      id\n      label\n      type\n      required\n      options\n    }\n  }\n}\n\nmutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {\n  submitResponse(formId: $formId, answers: $answers) {\n    id\n    formId\n    submittedAt\n    answers {\n      questionId\n      value\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;