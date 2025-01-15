import { z } from 'zod';

export const authLoginRequest = z.object({
  uniqueName: z.string(),
  password: z.string(),
});
