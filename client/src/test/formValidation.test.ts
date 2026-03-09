import { describe, expect, it } from 'vitest';
import { validateDraft, validateAnswers } from '../utils/formValidation';
import type { FormDraft } from '../types/forms';

const validDraft: FormDraft = {
  title: 'Candidate survey',
  description: 'Description',
  questions: [
    {
      id: '1',
      label: 'Your name',
      type: 'TEXT',
      required: true,
      options: [],
    },
    {
      id: '2',
      label: 'Your stack',
      type: 'MULTIPLE_CHOICE',
      required: true,
      options: ['React', 'Vue'],
    },
  ],
};

describe('form validation utils', () => {
  it('validates a correct draft', () => {
    expect(validateDraft(validDraft)).toHaveLength(0);
  });

  it('returns issues for missing title and missing options', () => {
    const issues = validateDraft({
      ...validDraft,
      title: '',
      questions: [{ ...validDraft.questions[1], options: ['Only one'] }],
    });

    expect(issues.some((issue) => issue.field === 'title')).toBe(true);
    expect(issues.some((issue) => issue.field.includes('options'))).toBe(true);
  });

  it('validates required answers', () => {
    const issues = validateAnswers(validDraft.questions, { '2': ['React'] });
    expect(issues).toHaveLength(1);
    expect(issues[0]?.field).toBe('1');
  });
});
