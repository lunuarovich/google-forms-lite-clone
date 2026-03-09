import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { FormCard } from '../components/forms/FormCard';

describe('FormCard', () => {
  it('renders links for filling and viewing responses', () => {
    render(
      <MemoryRouter>
        <FormCard
          form={{
            id: 'form-1',
            title: 'Test Form',
            description: 'Test description',
            createdAt: new Date().toISOString(),
            questions: [],
          }}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('Test Form')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view form/i })).toHaveAttribute('href', '/forms/form-1/fill');
    expect(screen.getByRole('link', { name: /view responses/i })).toHaveAttribute('href', '/forms/form-1/responses');
  });
});
