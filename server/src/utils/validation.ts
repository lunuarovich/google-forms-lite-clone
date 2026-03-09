import type { AnswerInput, Form, QuestionInput } from '../types/index.js';
import { QuestionType } from '../types/index.js';

export const validateQuestionInputs = (questions: QuestionInput[] = []): void => {
  questions.forEach((question, index) => {
    if (!question.label.trim()) {
      throw new Error(`Question #${index + 1} must have a label.`);
    }

    const needsOptions =
      question.type === QuestionType.MULTIPLE_CHOICE || question.type === QuestionType.CHECKBOX;

    if (needsOptions) {
      if (!question.options || question.options.filter(Boolean).length < 2) {
        throw new Error(`Question \"${question.label}\" must contain at least 2 options.`);
      }
    }
  });
};

export const validateResponseInput = (form: Form, answers: AnswerInput[]): void => {
  const answerMap = new Map(answers.map((answer) => [answer.questionId, answer.value]));

  form.questions.forEach((question) => {
    const answer = answerMap.get(question.id) ?? [];

    if (question.required && answer.length === 0) {
      throw new Error(`Question \"${question.label}\" is required.`);
    }

    if (question.type === QuestionType.TEXT) {
      if (answer.length > 1) {
        throw new Error(`Question \"${question.label}\" accepts a single text value.`);
      }
    }

    if (question.type === QuestionType.DATE) {
      if (answer.length > 1) {
        throw new Error(`Question \"${question.label}\" accepts a single date value.`);
      }

      if (answer[0] && Number.isNaN(Date.parse(answer[0]))) {
        throw new Error(`Question \"${question.label}\" must contain a valid date.`);
      }
    }

    if (question.type === QuestionType.MULTIPLE_CHOICE) {
      if (answer.length > 1) {
        throw new Error(`Question \"${question.label}\" accepts only one selected option.`);
      }

      if (answer[0] && !question.options.includes(answer[0])) {
        throw new Error(`Question \"${question.label}\" contains an invalid option.`);
      }
    }

    if (question.type === QuestionType.CHECKBOX) {
      const hasInvalidOption = answer.some((selectedOption) => !question.options.includes(selectedOption));

      if (hasInvalidOption) {
        throw new Error(`Question \"${question.label}\" contains invalid checkbox values.`);
      }
    }
  });
};
