import { useParams } from 'react-router-dom';
import { PageState } from '../components/common/PageState';
import { FormRenderer } from '../components/forms/FormRenderer';
import { useGetFormQuery } from '../services/formsApi';

export const FillFormPage = () => {
  const { id = '' } = useParams();
  const { data, isLoading, isError, error } = useGetFormQuery(id, { skip: !id });

  if (isLoading) {
    return <PageState title="Loading form..." description="Fetching form details by ID." />;
  }

  if (isError) {
    const message = 'data' in error ? error.data.message : 'Failed to load form.';
    return <PageState title="Unable to load form" description={message} tone="error" />;
  }

  if (!data) {
    return <PageState title="Form not found" description="This form does not exist." tone="error" />;
  }

  return <FormRenderer form={data} />;
};
