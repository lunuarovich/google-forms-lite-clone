import { parse, type DocumentNode } from 'graphql';

export type Maybe<T> = T | null;

export type QuestionType = 'TEXT' | 'MULTIPLE_CHOICE' | 'CHECKBOX' | 'DATE';

export interface QuestionInput {
  label: string;
  type: QuestionType;
  required?: boolean | null;
  options?: string[] | null;
}

export interface AnswerInput {
  questionId: string;
  value: string[];
}

export interface FormQuestion {
  id: string;
  label: string;
  type: QuestionType;
  required: boolean;
  options: string[];
}

export interface FormEntity {
  id: string;
  title: string;
  description?: Maybe<string>;
  createdAt: string;
  questions: FormQuestion[];
}

export interface ResponseAnswer {
  questionId: string;
  value: string[];
}

export interface ResponseEntity {
  id: string;
  formId: string;
  submittedAt: string;
  answers: ResponseAnswer[];
}

export interface GetFormsQuery {
  forms: FormEntity[];
}

export interface GetFormQueryVariables {
  id: string;
}

export interface GetFormQuery {
  form: Maybe<FormEntity>;
}

export interface GetResponsesQueryVariables {
  formId: string;
}

export interface GetResponsesQuery {
  responses: ResponseEntity[];
}

export interface CreateFormMutationVariables {
  title: string;
  description?: Maybe<string>;
  questions?: QuestionInput[];
}

export interface CreateFormMutation {
  createForm: FormEntity;
}

export interface SubmitResponseMutationVariables {
  formId: string;
  answers: AnswerInput[];
}

export interface SubmitResponseMutation {
  submitResponse: ResponseEntity;
}

export const GetFormsDocument: DocumentNode = parse(`
  query GetForms {
    forms {
      id
      title
      description
      createdAt
      questions {
        id
        label
        type
        required
        options
      }
    }
  }
`);

export const GetFormDocument: DocumentNode = parse(`
  query GetForm($id: ID!) {
    form(id: $id) {
      id
      title
      description
      createdAt
      questions {
        id
        label
        type
        required
        options
      }
    }
  }
`);

export const GetResponsesDocument: DocumentNode = parse(`
  query GetResponses($formId: ID!) {
    responses(formId: $formId) {
      id
      formId
      submittedAt
      answers {
        questionId
        value
      }
    }
  }
`);

export const CreateFormDocument: DocumentNode = parse(`
  mutation CreateForm($title: String!, $description: String, $questions: [QuestionInput!]) {
    createForm(title: $title, description: $description, questions: $questions) {
      id
      title
      description
      createdAt
      questions {
        id
        label
        type
        required
        options
      }
    }
  }
`);

export const SubmitResponseDocument: DocumentNode = parse(`
  mutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {
    submitResponse(formId: $formId, answers: $answers) {
      id
      formId
      submittedAt
      answers {
        questionId
        value
      }
    }
  }
`);
