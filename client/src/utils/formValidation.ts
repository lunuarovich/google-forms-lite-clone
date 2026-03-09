import type { BuilderQuestion, FormDraft, QuestionType, SubmittedAnswer } from '../types/forms';

export interface ValidationIssue {
  field: string;
  message: string;
}

const requiresOptions = (type: QuestionType) => type === 'MULTIPLE_CHOICE' || type === 'CHECKBOX';

const validateQuestion = (question: BuilderQuestion, index: number): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];

  if (!question.label.trim()) {
    issues.push({ field: `questions.${index}.label`, message: `Question ${index + 1} label is required.` });
  }

  if (requiresOptions(question.type)) {
    const normalizedOptions = question.options.map((option) => option.trim()).filter(Boolean);
    if (normalizedOptions.length < 2) {
      issues.push({
        field: `questions.${index}.options`,
        message: `Question ${index + 1} must contain at least two options.`,
      });
    }
  }

  return issues;
};

export const validateDraft = (draft: FormDraft): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];

  if (!draft.title.trim()) {
    issues.push({ field: 'title', message: 'Form title is required.' });
  }

  if (draft.questions.length === 0) {
    issues.push({ field: 'questions', message: 'Add at least one question.' });
  }

  draft.questions.forEach((question, index) => {
    issues.push(...validateQuestion(question, index));
  });

  return issues;
};

export const validateAnswers = (
  questions: BuilderQuestion[],
  answers: Record<string, string[]>,
): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];

  questions.forEach((question) => {
    const currentValues = answers[question.id] ?? [];

    if (question.required && currentValues.length === 0) {
      issues.push({ field: question.id, message: `Question "${question.label}" is required.` });
    }
  });

  return issues;
};

export const mapAnswersForSubmission = (answers: Record<string, string[]>): SubmittedAnswer[] =>
  Object.entries(answers).map(([questionId, value]) => ({ questionId, value }));
