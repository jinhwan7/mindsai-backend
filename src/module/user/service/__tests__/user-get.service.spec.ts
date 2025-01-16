import { Test, TestingModule } from '@nestjs/testing';
import { UserGetService } from '../user-get.service';
import { USER_DI_TOKEN } from '../../constant/user.di-token.constant';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../../domain/user';

describe('UserGetService', () => {
  let service: UserGetService;
  let mockUserGetOutboundPort: jest.Mocked<any>;

  const mockUser = User.from({
    id: 1,
    uniqueName: 'testUser',
    nickName: 'TestUser',
    password: 'hashedPassword',
  });

  beforeEach(async () => {
    mockUserGetOutboundPort = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserGetService,
        {
          provide: USER_DI_TOKEN.USER_GET_OUTBOUND_PORT,
          useValue: mockUserGetOutboundPort,
        },
      ],
    }).compile();

    service = module.get<UserGetService>(UserGetService);
  });

  describe('execute', () => {
    const userId = 1;

    it('유저 조회 성공', async () => {
      mockUserGetOutboundPort.execute.mockResolvedValue(mockUser);

      const result = await service.execute(userId);

      expect(mockUserGetOutboundPort.execute).toHaveBeenCalledWith(userId);
      expect(result).toEqual(mockUser);
    });

    it('존재하지 않는 유저면 NotFoundException', async () => {
      const error = new NotFoundException();

      mockUserGetOutboundPort.execute.mockRejectedValue(error);

      await expect(service.execute(userId)).rejects.toThrow(NotFoundException);
    });

    it('예외처리안된 나머지 에러는 InternalServerErrorException처리', async () => {
      mockUserGetOutboundPort.execute.mockRejectedValue(new Error());

      await expect(service.execute(userId)).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('User 도메인 객체를 리턴해줘야함', async () => {
      mockUserGetOutboundPort.execute.mockResolvedValue(mockUser);

      const result = await service.execute(userId);

      expect(result).toBeInstanceOf(User);
    });

    it('outboundPort.execute가 한번만 호출되어야 함', async () => {
      mockUserGetOutboundPort.execute.mockResolvedValue(mockUser);

      await service.execute(userId);

      expect(mockUserGetOutboundPort.execute).toHaveBeenCalledTimes(1);
    });
  });
});
