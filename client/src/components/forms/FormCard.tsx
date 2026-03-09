import { Link } from 'react-router-dom';
import type { FormSummary } from '../../types/forms';

interface FormCardProps {
  form: FormSummary;
}

export const FormCard = ({ form }: FormCardProps) => (
  <article className="card form-card">
    <div>
      <h3>{form.title}</h3>
      <p>{form.description || 'No description provided.'}</p>
      <div className="meta-row">
        <span>{form.questions.length} question(s)</span>
        <span>Created: {new Date(form.createdAt).toLocaleString()}</span>
      </div>
    </div>
    <div className="action-row">
      <Link className="button" to={`/forms/${form.id}/fill`}>
        View form
      </Link>
      <Link className="button secondary" to={`/forms/${form.id}/responses`}>
        View responses
      </Link>
    </div>
  </article>
);
