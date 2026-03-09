import type { FormSummary } from '../../types/forms';
import { FormCard } from './FormCard';

interface FormListProps {
  forms: FormSummary[];
}

export const FormList = ({ forms }: FormListProps) => (
  <section className="grid-list">
    {forms.map((form) => (
      <FormCard key={form.id} form={form} />
    ))}
  </section>
);
