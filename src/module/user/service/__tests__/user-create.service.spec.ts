import { Test, TestingModule } from '@nestjs/testing';
import { UserCreateService } from '../user-create.service';
import { USER_DI_TOKEN } from '../../constant/user.di-token.constant';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from '../../domain/user';
import { UserCreateParam } from '../../dto/user-create/user-create.param';
import bcrypt from 'bcryptjs';
import { mockUser } from '../mockUser';

jest.mock('bcryptjs', () => ({
  hashSync: jest.fn().mockReturnValue('hashedPassword'),
}));

describe('UserCreateService', () => {
  let service: UserCreateService;
  let mockUserCreateOutboundPort: jest.Mocked<any>;

  beforeEach(async () => {
    mockUserCreateOutboundPort = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserCreateService,
        {
          provide: USER_DI_TOKEN.USER_CREATE_OUTBOUND_PORT,
          useValue: mockUserCreateOutboundPort,
        },
      ],
    }).compile();

    service = module.get<UserCreateService>(UserCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    const userCreateParam = new UserCreateParam({
      uniqueName: 'testUser',
      nickName: 'Test User',
      password: 'password123!',
    });

    it('bcrypt.hashSync가 한번만 호출되어야 함', async () => {
      mockUserCreateOutboundPort.execute.mockResolvedValue(mockUser);

      await service.execute(userCreateParam);

      expect(bcrypt.hashSync).toHaveBeenCalledTimes(1);
    });
    it('유저 생성 성공', async () => {
      mockUserCreateOutboundPort.execute.mockResolvedValue(mockUser);

      const result = await service.execute(userCreateParam);

      expect(bcrypt.hashSync).toHaveBeenCalledWith(
        userCreateParam.password,
        10,
      );
      expect(mockUserCreateOutboundPort.execute).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });

    it('userNickName이 중복되면 ConflictException', async () => {
      const error = new Error();
      error['code'] = 'ER_DUP_ENTRY';
      mockUserCreateOutboundPort.execute.mockRejectedValue(error);

      await expect(service.execute(userCreateParam)).rejects.toThrow(
        ConflictException,
      );
    });

    it('예외처리안된 나머지 에러는 InternalServerErrorException처리', async () => {
      mockUserCreateOutboundPort.execute.mockRejectedValue(new Error());

      await expect(service.execute(userCreateParam)).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('User도메인 객체를 리턴해줘야함', async () => {
      mockUserCreateOutboundPort.execute.mockResolvedValue(mockUser);

      const result = await service.execute(userCreateParam);

      expect(result).toBeInstanceOf(User);
    });
  });
});
