import { z } from 'zod';
import { c } from '../initContract';
import {
  userCreateRequest,
  userGetResponse,
  userListResponse,
  userUpdateRequest,
} from './user.model';

export const userUrl = '/user';

export const userApi = c.router({
  userCreate: {
    method: 'POST',
    path: `${userUrl}`,
    body: userCreateRequest,
    responses: {
      200: z.literal('success'),
      409: z.object({
        message: z.literal('Conflict'),
        statusCode: z.number().default(409),
      }),
      500: z.literal('InternalServerErrorException'),
    },
    summary: '회원가입',
    description: '회원가입',
  },

  userList: {
    method: 'GET',
    path: `${userUrl}`,
    query: z.object({
      uniqueName: z.string().optional(),
      nickName: z.string().optional(),
    }),
    responses: {
      200: userListResponse,
      404: z.literal('Not Found'),
      500: z.literal('InternalServerErrorException'),
    },
    summary: '유저 전체 조회',
    description: '유저 전체 조회',
  },

  userGet: {
    method: 'GET',
    path: `${userUrl}/:id`,
    responses: {
      200: userGetResponse,
      404: z.literal('Not Found'),
      500: z.literal('InternalServerErrorException'),
    },
    summary: 'user 단건 조회',
    description: 'user 단건 조회',
  },

  userUpdate: {
    method: 'PUT',
    path: `${userUrl}/:id`,
    body: userUpdateRequest,
    responses: {
      200: z.any(), //업데이트 완료된 user 내용 보내기
      404: z.literal('Not Found'),
      500: z.literal('InternalServerErrorException'),
    },
    summary: '유저정보 update',
    description: '유저정보 update',
  },

  userDelete: {
    method: 'DELETE',
    path: `${userUrl}/:id`,
    responses: {
      200: z.any(),
      404: z.literal('Not Found'),
      500: z.literal('InternalServerErrorException'),
    },
    summary: '회원탈퇴',
    description: '이미 로그인인 된 유저가 삭제할 떄 사용, access token필요',
  },
});
