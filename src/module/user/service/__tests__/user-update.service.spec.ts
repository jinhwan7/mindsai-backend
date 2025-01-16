import { Test, TestingModule } from '@nestjs/testing';
import { UserUpdateService } from '../user-update.service';
import { USER_DI_TOKEN } from '../../constant/user.di-token.constant';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../../domain/user';
import { UserUpdateParam } from '../../dto/user-update/user-update.param';
import bcrypt from 'bcryptjs';

jest.mock('bcryptjs', () => ({
  hashSync: jest.fn().mockReturnValue('hashedPassword'),
}));

describe('UserUpdateService', () => {
  let service: UserUpdateService;
  let mockUserUpdateOutboundPort: jest.Mocked<any>;
  let mockUserGetOutboundPort: jest.Mocked<any>;

  const mockUser = User.from({
    id: 1,
    uniqueName: 'testUser',
    nickName: 'TestUser',
    password: 'hashedPassword',
  });

  beforeEach(async () => {
    mockUserUpdateOutboundPort = {
      execute: jest.fn(),
    };
    mockUserGetOutboundPort = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserUpdateService,
        {
          provide: USER_DI_TOKEN.USER_UPDATE_OUTBOUND_PORT,
          useValue: mockUserUpdateOutboundPort,
        },
        {
          provide: USER_DI_TOKEN.USER_GET_OUTBOUND_PORT,
          useValue: mockUserGetOutboundPort,
        },
      ],
    }).compile();

    service = module.get<UserUpdateService>(UserUpdateService);
  });

  describe('execute', () => {
    const userUpdateParamForPassword = new UserUpdateParam(1, {
      password: 'newPassword123!',
    });

    const userUpdateParamForNickname = new UserUpdateParam(1, {
      nickName: 'Updated User',
    });

    it('유저 업데이트 성공', async () => {
      mockUserGetOutboundPort.execute.mockResolvedValue(mockUser);
      mockUserUpdateOutboundPort.execute.mockResolvedValue(mockUser);

      const result = await service.execute(userUpdateParamForNickname);

      expect(mockUserGetOutboundPort.execute).toHaveBeenCalledWith(
        userUpdateParamForNickname.id,
      );
      expect(mockUserUpdateOutboundPort.execute).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });

    it('존재하지 않는 유저면 NotFoundException', async () => {
      const error = new NotFoundException();

      mockUserGetOutboundPort.execute.mockRejectedValue(error);

      await expect(service.execute(userUpdateParamForNickname)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('비밀번호 변경시 해싱 처리', async () => {
      mockUserGetOutboundPort.execute.mockResolvedValue(mockUser);
      mockUserUpdateOutboundPort.execute.mockResolvedValue(mockUser);

      await service.execute(userUpdateParamForPassword);

      expect(bcrypt.hashSync).toHaveBeenCalledWith(
        userUpdateParamForPassword.data.password,
        10,
      );
    });

    it('예외처리안된 나머지 에러는 InternalServerErrorException처리', async () => {
      mockUserGetOutboundPort.execute.mockResolvedValue(mockUser);
      mockUserUpdateOutboundPort.execute.mockRejectedValue(new Error());

      await expect(service.execute(userUpdateParamForNickname)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
