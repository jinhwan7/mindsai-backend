import { registerAs } from '@nestjs/config';

export default registerAs(
  'app',
  (): Record<string, any> => ({
    env: process.env.APP_ENV ?? 'development',
    http: {
      host: process.env.HTTP_HOST ?? 'localhost',
      port: process.env.HTTP_PORT
        ? Number.parseInt(process.env.HTTP_PORT)
        : 8080,
      allowedOrigin: process.env.ALLOWED_ORIGIN ?? 'http://localhost:3000',
    },

    jwtSecretKey: process.env.JWT_SECRET ?? 'test',
  }),
);
