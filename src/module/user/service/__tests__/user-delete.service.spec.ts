import { Test, TestingModule } from '@nestjs/testing';
import { UserDeleteService } from '../user-delete.service';
import { USER_DI_TOKEN } from '../../constant/user.di-token.constant';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../../domain/user';
import { mockUser } from '../mockUser';

describe('UserDeleteService', () => {
  let service: UserDeleteService;
  let mockUserDeleteOutboundPort: jest.Mocked<any>;

  beforeEach(async () => {
    mockUserDeleteOutboundPort = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserDeleteService,
        {
          provide: USER_DI_TOKEN.USER_DELETE_OUTBOUND_PORT,
          useValue: mockUserDeleteOutboundPort,
        },
      ],
    }).compile();

    service = module.get<UserDeleteService>(UserDeleteService);
  });

  describe('execute', () => {
    const userId = 1;

    it('유저 삭제 성공', async () => {
      mockUserDeleteOutboundPort.execute.mockResolvedValue(mockUser);

      const result = await service.execute(userId);

      //userId라는 파라미터를 아웃바운드 포트에 넘겨줘야함
      expect(mockUserDeleteOutboundPort.execute).toHaveBeenCalledWith(userId);
      expect(result).toEqual(mockUser);
    });

    it('존재하지 않는 유저면 NotFoundException', async () => {
      const error = new NotFoundException();

      mockUserDeleteOutboundPort.execute.mockRejectedValue(error);

      await expect(service.execute(userId)).rejects.toThrow(NotFoundException);
    });

    it('예외처리안된 나머지 에러는 InternalServerErrorException처리', async () => {
      mockUserDeleteOutboundPort.execute.mockRejectedValue(new Error());

      await expect(service.execute(userId)).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('User 도메인 객체를 리턴해줘야함', async () => {
      mockUserDeleteOutboundPort.execute.mockResolvedValue(mockUser);

      const result = await service.execute(userId);

      expect(result).toBeInstanceOf(User);
    });
  });
});
