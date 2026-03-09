interface PageStateProps {
  title: string;
  description?: string;
  tone?: 'info' | 'error' | 'success';
}

export const PageState = ({ title, description, tone = 'info' }: PageStateProps) => (
  <section className={`card page-state ${tone}`}>
    <h2>{title}</h2>
    {description ? <p>{description}</p> : null}
  </section>
);
