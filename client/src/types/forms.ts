import type { QuestionType as GraphqlQuestionType } from '../graphql/generated/graphql';

export type QuestionType = GraphqlQuestionType;

export interface BuilderQuestion {
  id: string;
  label: string;
  type: QuestionType;
  required: boolean;
  options: string[];
}

export interface FormDraft {
  title: string;
  description: string;
  questions: BuilderQuestion[];
}

export interface FormSummary {
  id: string;
  title: string;
  description?: string | null;
  createdAt: string;
  questions: BuilderQuestion[];
}

export interface SubmittedAnswer {
  questionId: string;
  value: string[];
}

export interface SubmittedResponse {
  id: string;
  formId: string;
  submittedAt: string;
  answers: SubmittedAnswer[];
}
