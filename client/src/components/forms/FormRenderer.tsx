import { useMemo, useState } from 'react';
import type { FormSummary } from '../../types/forms';
import { mapAnswersForSubmission, validateAnswers } from '../../utils/formValidation';
import { useSubmitResponseMutation } from '../../services/formsApi';

interface FormRendererProps {
  form: FormSummary;
}

export const FormRenderer = ({ form }: FormRendererProps) => {
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [submitResponse, submitState] = useSubmitResponseMutation();
  const [successMessage, setSuccessMessage] = useState('');

  const validationIssues = useMemo(() => validateAnswers(form.questions, answers), [answers, form.questions]);

  const setSingleValue = (questionId: string, value: string) => {
    setAnswers((current) => ({ ...current, [questionId]: value ? [value] : [] }));
  };

  const toggleCheckboxValue = (questionId: string, value: string) => {
    setAnswers((current) => {
      const currentValues = current[questionId] ?? [];
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      return {
        ...current,
        [questionId]: nextValues,
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage('');

    if (validationIssues.length > 0) {
      return;
    }

    await submitResponse({
      formId: form.id,
      answers: mapAnswersForSubmission(answers),
    }).unwrap();

    setSuccessMessage('Form submitted successfully!');
    setAnswers({});
  };

  return (
    <form className="stack" onSubmit={handleSubmit}>
      <section className="card stack">
        <h2>{form.title}</h2>
        <p>{form.description || 'No description provided.'}</p>
      </section>

      {form.questions.map((question, index) => {
        const selectedValues = answers[question.id] ?? [];

        return (
          <section className="card stack" key={question.id}>
            <div>
              <h3>
                {index + 1}. {question.label}
              </h3>
              <p className="muted">
                Type: {question.type.replaceAll('_', ' ')} {question.required ? '• Required' : '• Optional'}
              </p>
            </div>

            {question.type === 'TEXT' ? (
              <input value={selectedValues[0] ?? ''} onChange={(event) => setSingleValue(question.id, event.target.value)} />
            ) : null}

            {question.type === 'DATE' ? (
              <input type="date" value={selectedValues[0] ?? ''} onChange={(event) => setSingleValue(question.id, event.target.value)} />
            ) : null}

            {question.type === 'MULTIPLE_CHOICE'
              ? question.options.map((option) => (
                  <label key={option} className="checkbox-inline">
                    <input
                      type="radio"
                      name={question.id}
                      checked={selectedValues[0] === option}
                      onChange={() => setSingleValue(question.id, option)}
                    />
                    {option}
                  </label>
                ))
              : null}

            {question.type === 'CHECKBOX'
              ? question.options.map((option) => (
                  <label key={option} className="checkbox-inline">
                    <input
                      type="checkbox"
                      checked={selectedValues.includes(option)}
                      onChange={() => toggleCheckboxValue(question.id, option)}
                    />
                    {option}
                  </label>
                ))
              : null}
          </section>
        );
      })}

      {validationIssues.length > 0 ? (
        <section className="card error-list">
          <h3>Validation issues</h3>
          <ul>
            {validationIssues.map((issue) => (
              <li key={`${issue.field}-${issue.message}`}>{issue.message}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {submitState.error ? (
        <section className="card error-list">
          <p>{'data' in submitState.error ? submitState.error.data.message : 'Failed to submit form.'}</p>
        </section>
      ) : null}

      {successMessage ? (
        <section className="card success-box">
          <p>{successMessage}</p>
        </section>
      ) : null}

      <button type="submit" className="button" disabled={submitState.isLoading || validationIssues.length > 0}>
        {submitState.isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};
