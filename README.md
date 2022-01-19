# Inventory tracking app

- CRUD for Inventory Items
- CRUD for Shipments
- Add/remove items to/from shipments

---

## Tech Stack

- Monorepo build system using [Nx](https://nx.dev)

> I chose a monorepo architecture because it allows for great modularity, code sharing, and easy extensibility, since all core functionality is split betwen libraries

---

- Typescript for the entire stack
- GraphQL API in Node.js using NestJS
- PostgreSQL database accessed with [Prisma](https://www.prisma.io/), an ORM for first-class Typescript support

> Using GraphQL and NestJS together allows for easy extensibility because of a decorator-heavy syntax, so data can be easily annotated to create GQL schemas, Authentication/Authorization can be made available using concepts like guards, and server side data validation is accomplished by simply using annotated DTOs and Validation Pipelines

---

- React App with Next.js
- ChakraUI for pre built react components
- GraphQL code generator for react hooks

> I chose GraphQL since I have full control over both the API and the frontend, and therefore GraphQL will allow for better DX as the modern toolchain guarantees end-to-end type safety and a faster development experience

## Run locally

### Requirements for local setup:

- [Node.js](https://nodejs.org/en/) (LTS will work fine)
- [PostgreSQL](https://www.postgresql.org/download/)

1. Install dependencies `npm install`
2. Create a `.env` file with the `DATABASE_URL`, `PORT`, and `NODE_ENV`. Here's a sample one:

```shell
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/inventory"
```

3. Run API server `npm run start`
4. Run React dev server `npm run start webapp`

## Misc

- The main backend app is in `apps/api/src` and all libraries are in `libs/`
- All the UI code is in `apps/webapp` but this would usually be in a UI library in the `libs/` directory
- Frontend data access code (GraphQL queries/mutations) is in `libs/data-access`
