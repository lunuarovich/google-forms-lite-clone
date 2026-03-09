import type { BuilderQuestion, QuestionType } from '../types/forms';
import { createLocalId } from './id';

export const createQuestionDraft = (type: QuestionType): BuilderQuestion => ({
  id: createLocalId(),
  label: '',
  type,
  required: false,
  options: type === 'MULTIPLE_CHOICE' || type === 'CHECKBOX' ? ['Option 1', 'Option 2'] : [],
});
