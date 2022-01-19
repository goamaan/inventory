export const configuration = () => ({
  environment: process.env.NODE_ENV,
  port: parseInt(process.env.PORT || '5000', 10),
  databaseUrl: process.env.DATABASE_URL,
});
