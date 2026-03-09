import type { BuilderQuestion, QuestionType } from '../../types/forms';

interface QuestionEditorProps {
  index: number;
  question: BuilderQuestion;
  onLabelChange: (questionId: string, label: string) => void;
  onTypeChange: (questionId: string, type: QuestionType) => void;
  onToggleRequired: (questionId: string) => void;
  onRemoveQuestion: (questionId: string) => void;
  onAddOption: (questionId: string) => void;
  onChangeOption: (questionId: string, optionIndex: number, value: string) => void;
  onRemoveOption: (questionId: string, optionIndex: number) => void;
}

const QUESTION_TYPES: Array<{ value: QuestionType; label: string }> = [
  { value: 'TEXT', label: 'Text' },
  { value: 'MULTIPLE_CHOICE', label: 'Multiple choice' },
  { value: 'CHECKBOX', label: 'Checkboxes' },
  { value: 'DATE', label: 'Date' },
];

export const QuestionEditor = ({
  index,
  question,
  onLabelChange,
  onTypeChange,
  onToggleRequired,
  onRemoveQuestion,
  onAddOption,
  onChangeOption,
  onRemoveOption,
}: QuestionEditorProps) => {
  const supportsOptions = question.type === 'MULTIPLE_CHOICE' || question.type === 'CHECKBOX';

  return (
    <article className="card question-editor">
      <div className="question-editor__header">
        <h3>Question {index + 1}</h3>
        <button type="button" className="button danger" onClick={() => onRemoveQuestion(question.id)}>
          Remove
        </button>
      </div>

      <label>
        Label
        <input value={question.label} onChange={(event) => onLabelChange(question.id, event.target.value)} />
      </label>

      <div className="form-grid two-columns">
        <label>
          Type
          <select value={question.type} onChange={(event) => onTypeChange(question.id, event.target.value as QuestionType)}>
            {QUESTION_TYPES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="checkbox-inline">
          <input type="checkbox" checked={question.required} onChange={() => onToggleRequired(question.id)} />
          Required
        </label>
      </div>

      {supportsOptions ? (
        <div className="options-block">
          <div className="question-editor__header">
            <h4>Options</h4>
            <button type="button" className="button secondary" onClick={() => onAddOption(question.id)}>
              Add option
            </button>
          </div>

          {question.options.map((option, optionIndex) => (
            <div key={`${question.id}-${optionIndex}`} className="option-row">
              <input
                value={option}
                onChange={(event) => onChangeOption(question.id, optionIndex, event.target.value)}
                placeholder={`Option ${optionIndex + 1}`}
              />
              <button
                type="button"
                className="button danger"
                onClick={() => onRemoveOption(question.id, optionIndex)}
                disabled={question.options.length <= 2}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
};
