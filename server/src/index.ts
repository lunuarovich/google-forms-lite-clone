import { createApp } from './app.js';

const PORT = Number(process.env.PORT ?? 4000);

const bootstrap = async (): Promise<void> => {
  const { app } = await createApp();

  app.listen(PORT, () => {
    console.log(`GraphQL server is running at http://localhost:${PORT}/graphql`);
  });
};

bootstrap().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
