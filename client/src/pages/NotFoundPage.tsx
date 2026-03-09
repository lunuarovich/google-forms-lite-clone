import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <section className="card stack">
    <h1>404</h1>
    <p>The page you requested does not exist.</p>
    <Link className="button" to="/">
      Back to homepage
    </Link>
  </section>
);
