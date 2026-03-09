# Google Forms Lite Clone

A monorepo implementation of the Trainee Front-End Developer test task.

## Stack

- **Monorepo:** npm workspaces
- **Client:** React, TypeScript, React Router, Redux Toolkit, RTK Query, GraphQL document types/codegen-ready setup, Vite
- **Server:** Node.js, Apollo Server, GraphQL, in-memory storage
- **Tests:** Vitest + Testing Library

## Project structure

```text
google-forms-lite-clone/
├─ client/
│  ├─ src/
│  │  ├─ app/
│  │  ├─ components/
│  │  ├─ graphql/
│  │  ├─ pages/
│  │  ├─ services/
│  │  ├─ store/
│  │  ├─ test/
│  │  ├─ types/
│  │  └─ utils/
│  ├─ codegen.ts
│  └─ vite.config.ts
├─ server/
│  ├─ src/
│  │  ├─ graphql/
│  │  ├─ resolvers/
│  │  ├─ store/
│  │  ├─ types/
│  │  ├─ utils/
│  │  └─ __tests__/
└─ package.json
```

## Features implemented

### Required
- Monorepo with `client` and `server`
- Concurrent local development via root script
- GraphQL schema with:
  - `Form`
  - `Question`
  - `Response`
  - `Answer`
- Queries:
  - `forms`
  - `form(id)`
  - `responses(formId)`
- Mutations:
  - `createForm`
  - `submitResponse`
- In-memory data store on the server
- Front-end pages:
  - `/`
  - `/forms/new`
  - `/forms/:id/fill`
  - `/forms/:id/responses`
- Redux Toolkit state for the builder draft
- RTK Query for GraphQL data fetching and mutations
- Business logic moved into utils/services/store helpers instead of components
- Loading and error states

### Bonus
- Client-side validation for form creation and form submission
- Tests for:
  - server resolvers
  - client validation utilities
  - form card rendering
- GraphQL codegen-ready configuration (`client/codegen.ts`)
- Pre-generated GraphQL typing/document file included under `client/src/graphql/generated/`

## Requirements

Install these locally:

- **Node.js 20+** (Node 22 recommended)
- **npm 10+**

## How to run

From the repository root:

```bash
npm install
npm run dev
```

This starts both apps together:

- **Client:** `http://localhost:5173`
- **Server:** `http://localhost:4000/graphql`

## Other scripts

### Build

```bash
npm run build
```

### Run tests

```bash
npm run test
```

### Regenerate GraphQL documents/types

```bash
npm run codegen
```

## Environment

The client uses this variable optionally:

```bash
VITE_GRAPHQL_URL=http://localhost:4000/graphql
```

If not provided, that same default URL is used automatically.

## How the app works

### Server flow
1. The Node server starts Apollo GraphQL.
2. Schema is loaded from `server/src/graphql/schema.graphql`.
3. Resolvers call the in-memory store in `server/src/store/db.ts`.
4. Forms and responses are stored only while the server is running.
5. Validation is handled in `server/src/utils/validation.ts` before data is saved.

### Client flow
1. React Router maps the four required pages.
2. The form builder draft is stored in Redux state (`formBuilderSlice`).
3. RTK Query sends GraphQL POST requests through a reusable `graphqlBaseQuery`.
4. Queries/mutations are defined in `formsApi.ts`.
5. Validation helpers in `utils/formValidation.ts` keep components thin.
6. After creation, the app redirects to the fill page of the newly created form.
7. After submission, the response page can read back all answers for that form.

## Notes

- The server seeds one example form on startup so the homepage is not empty.
- Because storage is in memory, restarting the server clears created forms and responses.
