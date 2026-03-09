import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateFormMutation } from '../../services/formsApi';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addQuestion,
  addQuestionOption,
  removeQuestion,
  removeQuestionOption,
  resetBuilder,
  setDescription,
  setTitle,
  toggleQuestionRequired,
  updateQuestionLabel,
  updateQuestionOption,
  updateQuestionType,
} from '../../store/formBuilderSlice';
import { QuestionType } from '../../graphql/generated/graphql';
import { validateDraft } from '../../utils/formValidation';
import { QuestionEditor } from './QuestionEditor';

const QUESTION_TYPE_OPTIONS = [
  { value: QuestionType.Text, label: 'Text' },
  { value: QuestionType.MultipleChoice, label: 'Multiple choice' },
  { value: QuestionType.Checkbox, label: 'Checkboxes' },
  { value: QuestionType.Date, label: 'Date' },
];

export const FormBuilder = () => {
  const draft = useAppSelector((state) => state.formBuilder);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<QuestionType>(QuestionType.Text);
  const [createForm, createFormState] = useCreateFormMutation();

  const validationIssues = useMemo(() => validateDraft(draft), [draft]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validationIssues.length > 0) {
      return;
    }

    const createdForm = await createForm({
      title: draft.title,
      description: draft.description,
      questions: draft.questions.map((question) => ({
        label: question.label,
        type: question.type,
        required: question.required,
        options: question.options,
      })),
    }).unwrap();

    dispatch(resetBuilder());
    navigate(`/forms/${createdForm.id}/fill`);
  };

  return (
    <form className="stack" onSubmit={handleSubmit}>
      <section className="card stack">
        <div>
          <h2>Create a new form</h2>
          <p>Use Redux Toolkit state to build the draft, then persist it with a GraphQL mutation.</p>
        </div>

        <label>
          Form title
          <input value={draft.title} onChange={(event) => dispatch(setTitle(event.target.value))} />
        </label>

        <label>
          Description
          <textarea
            rows={4}
            value={draft.description}
            onChange={(event) => dispatch(setDescription(event.target.value))}
          />
        </label>
      </section>

      <section className="card stack">
        <div className="question-toolbar">
          <div>
            <h3>Questions</h3>
            <p>Add different question types and manage options visually.</p>
          </div>
          <div className="toolbar-controls">
            <select value={selectedType} onChange={(event) => setSelectedType(event.target.value as QuestionType)}>
              {QUESTION_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button type="button" className="button" onClick={() => dispatch(addQuestion(selectedType))}>
              Add question
            </button>
          </div>
        </div>

        {draft.questions.length === 0 ? <p>No questions yet. Add your first one.</p> : null}

        {draft.questions.map((question, index) => (
          <QuestionEditor
            key={question.id}
            index={index}
            question={question}
            onLabelChange={(questionId, label) => dispatch(updateQuestionLabel({ questionId, label }))}
            onTypeChange={(questionId, type) => dispatch(updateQuestionType({ questionId, type }))}
            onToggleRequired={(questionId) => dispatch(toggleQuestionRequired(questionId))}
            onRemoveQuestion={(questionId) => dispatch(removeQuestion(questionId))}
            onAddOption={(questionId) => dispatch(addQuestionOption(questionId))}
            onChangeOption={(questionId, optionIndex, value) =>
              dispatch(updateQuestionOption({ questionId, optionIndex, value }))
            }
            onRemoveOption={(questionId, optionIndex) =>
              dispatch(removeQuestionOption({ questionId, optionIndex }))
            }
          />
        ))}
      </section>

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

      {createFormState.error ? (
        <section className="card error-list">
          <p>{'data' in createFormState.error ? createFormState.error.data.message : 'Failed to create form.'}</p>
        </section>
      ) : null}

      <div className="action-row">
        <button type="submit" className="button" disabled={createFormState.isLoading || validationIssues.length > 0}>
          {createFormState.isLoading ? 'Saving...' : 'Save form'}
        </button>
        <button type="button" className="button secondary" onClick={() => dispatch(resetBuilder())}>
          Reset draft
        </button>
      </div>
    </form>
  );
};
