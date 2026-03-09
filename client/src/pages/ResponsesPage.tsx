import { useParams } from 'react-router-dom';
import { PageState } from '../components/common/PageState';
import { ResponsesViewer } from '../components/forms/ResponsesViewer';
import { useGetFormQuery, useGetResponsesQuery } from '../services/formsApi';

export const ResponsesPage = () => {
  const { id = '' } = useParams();
  const formQuery = useGetFormQuery(id, { skip: !id });
  const responsesQuery = useGetResponsesQuery(id, { skip: !id });

  if (formQuery.isLoading || responsesQuery.isLoading) {
    return <PageState title="Loading responses..." description="Fetching form metadata and submissions." />;
  }

  if (formQuery.isError) {
    const message = 'data' in formQuery.error ? formQuery.error.data.message : 'Failed to load form.';
    return <PageState title="Unable to load form" description={message} tone="error" />;
  }

  if (responsesQuery.isError) {
    const message = 'data' in responsesQuery.error ? responsesQuery.error.data.message : 'Failed to load responses.';
    return <PageState title="Unable to load responses" description={message} tone="error" />;
  }

  if (!formQuery.data) {
    return <PageState title="Form not found" description="This form does not exist." tone="error" />;
  }

  return <ResponsesViewer form={formQuery.data} responses={responsesQuery.data ?? []} />;
};
