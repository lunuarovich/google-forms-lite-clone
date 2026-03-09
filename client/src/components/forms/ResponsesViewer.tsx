import type { FormSummary, SubmittedResponse } from '../../types/forms';

interface ResponsesViewerProps {
  form: FormSummary;
  responses: SubmittedResponse[];
}

export const ResponsesViewer = ({ form, responses }: ResponsesViewerProps) => {
  const getQuestionLabel = (questionId: string) => form.questions.find((question) => question.id === questionId)?.label ?? questionId;

  if (responses.length === 0) {
    return (
      <section className="card">
        <h2>No responses yet</h2>
        <p>Submit this form at least once to see stored answers here.</p>
      </section>
    );
  }

  return (
    <section className="stack">
      <section className="card">
        <h2>Responses for: {form.title}</h2>
        <p>{responses.length} submission(s) captured in memory on the GraphQL server.</p>
      </section>

      {responses.map((response, responseIndex) => (
        <article className="card stack" key={response.id}>
          <div>
            <h3>Response #{responseIndex + 1}</h3>
            <p className="muted">Submitted: {new Date(response.submittedAt).toLocaleString()}</p>
          </div>

          <div className="responses-table-wrapper">
            <table className="responses-table">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Answer</th>
                </tr>
              </thead>
              <tbody>
                {response.answers.map((answer) => (
                  <tr key={`${response.id}-${answer.questionId}`}>
                    <td>{getQuestionLabel(answer.questionId)}</td>
                    <td>{answer.value.join(', ') || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      ))}
    </section>
  );
};
