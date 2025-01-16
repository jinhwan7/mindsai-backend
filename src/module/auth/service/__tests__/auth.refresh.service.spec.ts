import { Test, TestingModule } from '@nestjs/testing';
import { AuthRefreshService } from '../auth.refresh.service';
import { JwtService } from '@nestjs/jwt';
import { USER_DI_TOKEN } from 'src/module/user/constant/user.di-token.constant';
import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/module/user/domain/user';
import { AuthToken } from '../../domain/authToken';

describe('AuthRefreshService', () => {
  let service: AuthRefreshService;
  let mockUserUpdateOutboundPort: jest.Mocked<any>;
  let mockUserGetOutboundPort: jest.Mocked<any>;
  let mockJwtService: jest.Mocked<any>;

  const oldMockUser = User.from({
    id: 1,
    uniqueName: 'testUser',
    nickName: 'Test User',
    password: 'hashedPassword',
    refreshToken: 'old-refresh-token',
  });

  const newMockUser = User.from({
    id: 1,
    uniqueName: 'testUser',
    nickName: 'Test User',
    password: 'hashedPassword',
    refreshToken: 'new-refresh-token',
  });

  beforeEach(async () => {
    mockUserUpdateOutboundPort = {
      execute: jest.fn(),
    };
    mockUserGetOutboundPort = {
      execute: jest.fn(),
    };
    mockJwtService = {
      verify: jest.fn(),
      sign: jest
        .fn()
        .mockReturnValueOnce('new-access-token')
        .mockReturnValueOnce('new-refresh-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthRefreshService,
        {
          provide: USER_DI_TOKEN.USER_UPDATE_OUTBOUND_PORT,
          useValue: mockUserUpdateOutboundPort,
        },
        {
          provide: USER_DI_TOKEN.USER_GET_OUTBOUND_PORT,
          useValue: mockUserGetOutboundPort,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthRefreshService>(AuthRefreshService);
  });

  describe('execute', () => {
    const refreshToken = 'valid-refresh-token';

    it('토큰 갱신 성공', async () => {
      mockJwtService.verify.mockResolvedValue({ id: 1 });
      mockUserGetOutboundPort.execute.mockResolvedValue(oldMockUser);
      mockUserUpdateOutboundPort.execute.mockResolvedValue(newMockUser);

      const result = await service.execute(refreshToken);

      expect(mockJwtService.verify).toHaveBeenCalledWith(refreshToken);
      expect(mockUserGetOutboundPort.execute).toHaveBeenCalledWith(1);

      const updateCall = mockUserUpdateOutboundPort.execute.mock.calls[0][0];
      expect(updateCall.data.refreshToken).toEqual('new-refresh-token');

      expect(mockJwtService.sign).toHaveBeenCalledTimes(2);
      expect(result).toBeInstanceOf(AuthToken);
      expect(result.accessToken).toBe('new-access-token');
      expect(result.refreshToken).toBe('new-refresh-token');
    });

    it('유효하지 않은 토큰이면 UnauthorizedException', async () => {
      mockJwtService.verify.mockRejectedValue(new Error());

      await expect(service.execute(refreshToken)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
