import { db } from '../store/db.js';
import type { AnswerInput, QuestionInput } from '../types/index.js';
import { validateQuestionInputs, validateResponseInput } from '../utils/validation.js';

interface CreateFormArgs {
  title: string;
  description?: string | null;
  questions?: QuestionInput[];
}

interface SubmitResponseArgs {
  formId: string;
  answers: AnswerInput[];
}

export const resolvers = {
  Query: {
    forms: () => db.getForms(),
    form: (_parent: unknown, args: { id: string }) => db.getFormById(args.id) ?? null,
    responses: (_parent: unknown, args: { formId: string }) => db.getResponsesByFormId(args.formId),
  },
  Mutation: {
    createForm: (_parent: unknown, args: CreateFormArgs) => {
      if (!args.title.trim()) {
        throw new Error('Form title is required.');
      }

      validateQuestionInputs(args.questions ?? []);

      return db.createForm(args.title, args.description, args.questions ?? []);
    },
    submitResponse: (_parent: unknown, args: SubmitResponseArgs) => {
      const form = db.getFormById(args.formId);

      if (!form) {
        throw new Error('Form not found.');
      }

      validateResponseInput(form, args.answers);

      return db.createResponse(args.formId, args.answers);
    },
  },
};
