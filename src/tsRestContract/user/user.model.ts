import { z } from 'zod';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';

extendZodWithOpenApi(z);

export const userCreateRequest = z.object({
  uniqueName: z
    .string()
    .min(3, { message: 'uniqueName must be at least 3 characters long.' }) // 최소 길이 제한
    .max(20, { message: 'uniqueName must not exceed 20 characters.' }) // 최대 길이 제한
    .regex(/^[a-z][a-z0-9_]*$/, {
      message:
        'uniqueName must start with a lowercase letter and can only contain lowercase letters, numbers, and underscores.',
    })
    .openapi({
      description:
        'uniqueName은 영어 소문자로 시작하고 숫자, 특수문자는 언더바만 가능',
    }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .max(100, { message: 'Password must not exceed 100 characters.' })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter.',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[@$!%*?&]/, {
      message: 'Password must contain at least one special character.',
    })
    .openapi({
      description: 'password는 영어 대,소문자 숫자,특수문자 포함되어야함',
    }),
  nickName: z
    .string()
    .min(1, { message: 'nickName is required.' })
    .max(30, { message: 'nickName must not exceed 30 characters.' }),
});

export const userListRequestQuery = z.object({
  uniqueName: z.string().optional(),
  nickName: z.string().optional(),
});

export const userUpdateRequest = z.object({
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .max(100, { message: 'Password must not exceed 100 characters.' })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter.',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[@$!%*?&]/, {
      message: 'Password must contain at least one special character.',
    })
    .optional()
    .openapi({
      description: 'password는 영어 대,소문자 숫자,특수문자 포함되어야함',
    }),

  nickName: z
    .string()
    .min(1, { message: 'nickName is required.' })
    .max(30, { message: 'nickName must not exceed 30 characters.' })
    .optional(),
});

export const userGetResponse = z.object({
  id: z.number(),
  uniqueName: z.string(),
  nickName: z.string(),
});

export const userListResponse = z.array(
  z.object({
    id: z.number(),
    uniqueName: z.string(),
    nickName: z.string(),
  }),
);
