import { z } from 'zod';
import { c } from '../initContract';
import { authLoginRequest } from './auth.model';

export const authUrl = '/auth';

export const authApi = c.router({
  login: {
    method: 'POST',
    path: `${authUrl}/login`,
    body: authLoginRequest,
    responses: {
      200: z.literal('success'),
      404: z.literal('Not Found'),
      500: z.literal('Server Error'),
    },
    summary: 'login',
    description: 'login',
  },

  logout: {
    method: 'DELETE',
    path: `${authUrl}/logout`,
    responses: {
      200: z.literal('success'),
      404: z.literal('Not Found'),
      500: z.literal('Server Error'),
    },
    summary: 'logout',
    description: 'logout',
  },

  refresh: {
    method: 'GET',
    path: `${authUrl}/refresh`,
    responses: {
      200: z.any(),
      404: z.literal('Not Found'),
      500: z.literal('Server Error'),
    },
    summary: 'refresh',
    description: 'refresh',
  },
});
