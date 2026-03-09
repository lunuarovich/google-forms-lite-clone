import { Link } from 'react-router-dom';
import type { PropsWithChildren } from 'react';

export const AppShell = ({ children }: PropsWithChildren) => (
  <div className="app-shell">
    <header className="topbar">
      <div>
        <Link to="/" className="brand-link">
          Google Forms Lite Clone
        </Link>
        <p className="subtitle">React + RTK Query + GraphQL monorepo test task implementation</p>
      </div>
      <nav className="topbar-nav">
        <Link className="button secondary" to="/">
          All forms
        </Link>
        <Link className="button" to="/forms/new">
          Create new form
        </Link>
      </nav>
    </header>
    <main className="container">{children}</main>
  </div>
);
