export enum QuestionType {
  TEXT = 'TEXT',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  CHECKBOX = 'CHECKBOX',
  DATE = 'DATE',
}

export interface Question {
  id: string;
  label: string;
  type: QuestionType;
  required: boolean;
  options: string[];
}

export interface Form {
  id: string;
  title: string;
  description?: string | null;
  questions: Question[];
  createdAt: string;
}

export interface Answer {
  questionId: string;
  value: string[];
}

export interface FormResponse {
  id: string;
  formId: string;
  answers: Answer[];
  submittedAt: string;
}

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
