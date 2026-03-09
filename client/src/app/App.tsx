import { Route, Routes } from 'react-router-dom';
import { AppShell } from '../components/common/AppShell';
import { HomePage } from '../pages/HomePage';
import { NewFormPage } from '../pages/NewFormPage';
import { FillFormPage } from '../pages/FillFormPage';
import { ResponsesPage } from '../pages/ResponsesPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const App = () => (
  <AppShell>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/forms/new" element={<NewFormPage />} />
      <Route path="/forms/:id/fill" element={<FillFormPage />} />
      <Route path="/forms/:id/responses" element={<ResponsesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </AppShell>
);
