# Google Forms Lite Clone

A monorepo implementation of the **Trainee Front-End Developer test
task**.

The project implements a simplified Google Forms--like application where
users can create forms, fill them, and view responses.

---

# Live Demo

Client:\
https://google-forms-lite-clone-client-rho.vercel.app

GraphQL API:\
https://google-forms-lite-clone-a8fr.onrender.com/graphql

---

# Stack

### Monorepo

- npm workspaces

### Client

- React
- TypeScript
- React Router
- Redux Toolkit
- RTK Query
- GraphQL
- GraphQL Code Generator
- Vite

### Server

- Node.js
- Apollo Server
- GraphQL
- In-memory storage

### Testing

- Vitest
- Testing Library

---

# Architecture

The project is implemented as a **monorepo using npm workspaces**.

google-forms-lite-clone/ ├─ client/ (React application)\
├─ server/ (Node.js GraphQL API)\
└─ package.json

### Client responsibilities

- form creation
- form filling
- viewing responses
- client-side validation
- UI state management

### Server responsibilities

- GraphQL API
- form storage
- response storage
- validation before saving

Client communicates with the server using **GraphQL POST requests**.

---

# Project structure

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

---

# Features implemented

## Required

- Monorepo with `client` and `server`
- Concurrent local development via root script
- GraphQL schema with:
  - `Form`
  - `Question`
  - `Response`
  - `Answer`

### Queries

- `forms`
- `form(id)`
- `responses(formId)`

### Mutations

- `createForm`
- `submitResponse`

### Backend

- In-memory data store
- GraphQL API via Apollo Server
- Input validation before saving

### Frontend pages

- `/`
- `/forms/new`
- `/forms/:id/fill`
- `/forms/:id/responses`

### State management

- Redux Toolkit for builder draft
- RTK Query for GraphQL requests

### UI behavior

- loading states
- error states
- navigation after form creation

---

## Bonus

- Client-side validation
- Unit tests for:
  - server resolvers
  - validation utilities
  - UI components
- GraphQL Code Generator configured
- Generated GraphQL types included

---

# Requirements

Node.js 20+\
npm 10+

Node **22 recommended**.

---

# How to run locally

From repository root:

npm install\
npm run dev

Client will run at:\
http://localhost:5173

Server (GraphQL API):\
http://localhost:4000/graphql

---

# Available scripts

Start development:

npm run dev

Build project:

npm run build

Run tests:

npm run test

Regenerate GraphQL types:

npm run codegen

---

# Environment variables

Client can use this optional variable.

Local development:

VITE_GRAPHQL_URL=http://localhost:4000/graphql

Production example:

VITE_GRAPHQL_URL=https://your-server.onrender.com/graphql

If the variable is not provided, the client defaults to the local
GraphQL endpoint.

---

# How the application works

## Server flow

1.  Node server starts Apollo GraphQL server.
2.  Schema is loaded from: server/src/graphql/schema.graphql
3.  Resolvers interact with: server/src/store/db.ts
4.  Validation runs before storing responses.
5.  Data exists **only while the server is running**.

## Client flow

1.  React Router defines application pages.
2.  Form builder state is stored in Redux.
3.  RTK Query performs GraphQL requests.
4.  Queries and mutations are defined in:
    client/src/services/formsApi.ts
5.  Validation utilities keep components simple.
6.  After creating a form, the app redirects to the form fill page.
7.  After submission, responses can be viewed on the responses page.

---

# Deployment

Client is deployed on **Vercel**.\
Server is deployed on **Render**.

The client communicates with the server via a public GraphQL endpoint.

---

# Notes

- The server seeds one example form on startup.
- Storage is **in-memory**, so restarting the server clears all
  created data.
- The project focuses on architecture, GraphQL integration, and clean
  component design.
