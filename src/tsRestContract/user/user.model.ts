import { z } from 'zod';

export const userCreateRequest = z.object({
  uniqueName: z.string(),
  password: z.string(),
  nickName: z.string(),
});

export const userUpdateRequest = z.object({
  nickName: z.string(),
  password: z.string(),
});

export const userResponse = z.object({
  id: z.number(),
  uniqueName: z.string(),
  nickName: z.string(),
  refreshToken: z.string(),
});

export const userListQuery = z.object({
  uniqueName: z.string().optional(),
  nickName: z.string().optional(),
});
