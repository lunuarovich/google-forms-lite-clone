import { v4 as uuid } from 'uuid';
import type { Form, FormResponse, QuestionInput } from '../types/index.js';
import { QuestionType } from '../types/index.js';

const forms = new Map<string, Form>();
const responses = new Map<string, FormResponse[]>();

const nowIso = () => new Date().toISOString();

const seedForms = (): void => {
  if (forms.size > 0) return;

  const formId = uuid();
  const seededQuestions: Form['questions'] = [
    {
      id: uuid(),
      label: 'What is your name?',
      type: QuestionType.TEXT,
      required: true,
      options: [],
    },
    {
      id: uuid(),
      label: 'Choose your preferred contact method',
      type: QuestionType.MULTIPLE_CHOICE,
      required: true,
      options: ['Email', 'Phone', 'Telegram'],
    },
    {
      id: uuid(),
      label: 'Which frontend tools do you use?',
      type: QuestionType.CHECKBOX,
      required: false,
      options: ['React', 'Redux Toolkit', 'TypeScript', 'Tailwind CSS'],
    },
    {
      id: uuid(),
      label: 'When can you start?',
      type: QuestionType.DATE,
      required: false,
      options: [],
    },
  ];

  forms.set(formId, {
    id: formId,
    title: 'Frontend Candidate Intake Form',
    description: 'A seeded example form to demonstrate the app right after startup.',
    questions: seededQuestions,
    createdAt: nowIso(),
  });

  responses.set(formId, []);
};

seedForms();

export const db = {
  getForms(): Form[] {
    return Array.from(forms.values());
  },
  getFormById(id: string): Form | undefined {
    return forms.get(id);
  },
  createForm(title: string, description: string | null | undefined, questions: QuestionInput[] = []): Form {
    const id = uuid();
    const form: Form = {
      id,
      title,
      description: description ?? '',
      questions: questions.map((question) => ({
        id: uuid(),
        label: question.label,
        type: question.type,
        required: question.required ?? false,
        options: question.options?.filter(Boolean) ?? [],
      })),
      createdAt: nowIso(),
    };

    forms.set(id, form);
    responses.set(id, []);

    return form;
  },
  getResponsesByFormId(formId: string): FormResponse[] {
    return responses.get(formId) ?? [];
  },
  createResponse(formId: string, answers: FormResponse['answers']): FormResponse {
    const response: FormResponse = {
      id: uuid(),
      formId,
      answers,
      submittedAt: nowIso(),
    };

    const currentResponses = responses.get(formId) ?? [];
    responses.set(formId, [...currentResponses, response]);

    return response;
  },
  reset(): void {
    forms.clear();
    responses.clear();
    seedForms();
  },
};
