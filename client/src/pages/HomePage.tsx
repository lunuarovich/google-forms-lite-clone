import { Link } from 'react-router-dom';
import { FormList } from '../components/forms/FormList';
import { PageState } from '../components/common/PageState';
import { useGetFormsQuery } from '../services/formsApi';

export const HomePage = () => {
  const { data, isLoading, isError, error } = useGetFormsQuery();

  if (isLoading) {
    return <PageState title="Loading forms..." description="Fetching forms from the GraphQL API." />;
  }

  if (isError) {
    const message = 'data' in error ? error.data.message : 'Failed to load forms.';
    return <PageState title="Unable to load forms" description={message} tone="error" />;
  }

  if (!data || data.length === 0) {
    return (
      <PageState
        title="No forms yet"
        description="Create your first form to start collecting responses."
        tone="info"
      />
    );
  }

  return (
    <section className="stack">
      <section className="hero card">
        <div>
          <h1>All forms</h1>
          <p>Browse all created forms, open one for filling, or inspect stored responses.</p>
        </div>
        <Link className="button" to="/forms/new">
          Create new form
        </Link>
      </section>
      <FormList forms={data} />
    </section>
  );
};
