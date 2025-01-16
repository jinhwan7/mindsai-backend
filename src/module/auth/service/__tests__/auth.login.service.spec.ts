import { Test, TestingModule } from '@nestjs/testing';
import { AuthLoginService } from '../auth.login.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { USER_DI_TOKEN } from 'src/module/user/constant/user.di-token.constant';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/module/user/domain/user';
import { AuthLoginRequest } from '../../dto/auth-login.request';
import bcrypt from 'bcryptjs';
import { AuthToken } from '../../domain/authToken';

jest.mock('bcryptjs', () => ({
  compareSync: jest.fn().mockReturnValue(true),
}));

describe('AuthLoginService', () => {
  let service: AuthLoginService;
  let mockUserListOutboundPort: jest.Mocked<any>;
  let mockUserUpdateOutboundPort: jest.Mocked<any>;
  let mockJwtService: jest.Mocked<any>;

  const mockUser = User.from({
    id: 1,
    uniqueName: 'testUser',
    nickName: 'Test User',
    password: 'hashedPassword',
  });

  beforeEach(async () => {
    mockUserListOutboundPort = {
      execute: jest.fn(),
    };
    mockUserUpdateOutboundPort = {
      execute: jest.fn(),
    };
    mockJwtService = {
      sign: jest
        .fn()
        .mockReturnValueOnce('mock-access-token')
        .mockReturnValueOnce('mock-refresh-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthLoginService,
        {
          provide: USER_DI_TOKEN.USER_LIST_OUTBOUND_PORT,
          useValue: mockUserListOutboundPort,
        },
        {
          provide: USER_DI_TOKEN.USER_UPDATE_OUTBOUND_PORT,
          useValue: mockUserUpdateOutboundPort,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthLoginService>(AuthLoginService);
  });

  describe('execute', () => {
    const loginRequest: AuthLoginRequest = {
      uniqueName: 'testUser',
      password: 'password123!',
    };

    it('로그인 성공', async () => {
      mockUserListOutboundPort.execute.mockResolvedValue([mockUser]);
      mockUserUpdateOutboundPort.execute.mockResolvedValue(mockUser);

      const result = await service.execute(loginRequest);

      expect(bcrypt.compareSync).toHaveBeenCalledWith(
        loginRequest.password,
        mockUser.password,
      );
      expect(mockJwtService.sign).toHaveBeenCalledTimes(2);
      expect(result).toBeInstanceOf(AuthToken);
      expect(result.accessToken).toBe('mock-access-token');
      expect(result.refreshToken).toBe('mock-refresh-token');
    });

    it('유저가 없으면 NotFoundException', async () => {
      const error = new NotFoundException();

      mockUserListOutboundPort.execute.mockRejectedValue(error);

      await expect(service.execute(loginRequest)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('예외처리안된 나머지 에러는 InternalServerErrorException처리', async () => {
      mockUserListOutboundPort.execute.mockRejectedValue(new Error());

      await expect(service.execute(loginRequest)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
