import { authLoginRequest } from 'src/tsRestContract/auth/auth.model';
import { z } from 'zod';

export type AuthLoginRequest = z.infer<typeof authLoginRequest>;
