import { Module } from '@nestjs/common';
import { UserCreateController } from './controller/user-create.controller';
import { UserCreateService } from './service/user-create.service';
import { UserRepository } from './repository/user.repository';
import { USER_DI_TOKEN } from './constant/user.di-token.constant';
import { UserCreateRepository } from './repository/user-create.repository';
import { UserGetController } from './controller/user-get.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/common/db/entity/user.entity';
import { UserListRepository } from './repository/user-list.repository';
import { UserListService } from './service/user-list.service';
import { UserGetService } from './service/user-get.service';
import { UserGetRepository } from './repository/user-get.repository';
import { UserUpdateRepository } from './repository/user-update.repository';
import { UserListController } from './controller/user-list.controller';
import { UserUpdateController } from './controller/user-update.controller';
import { UserUpdateService } from './service/user-update.service';
import { UserDeleteController } from './controller/user-delete.controller';
import { UserDeleteService } from './service/user-delete.service';
import { UserDeleteRepository } from './repository/user-delete.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [
    UserCreateController,
    UserGetController,
    UserListController,
    UserUpdateController,
    UserDeleteController,
  ],
  providers: [
    UserRepository,

    //create
    {
      provide: USER_DI_TOKEN.USER_CREATE_INBOUND_PORT,
      useClass: UserCreateService,
    },
    {
      provide: USER_DI_TOKEN.USER_CREATE_OUTBOUND_PORT,
      useClass: UserCreateRepository,
    },

    //get
    {
      provide: USER_DI_TOKEN.USER_GET_INBOUND_PORT,
      useClass: UserGetService,
    },
    {
      provide: USER_DI_TOKEN.USER_GET_OUTBOUND_PORT,
      useClass: UserGetRepository,
    },

    //list
    {
      provide: USER_DI_TOKEN.USER_LIST_INBOUND_PORT,
      useClass: UserListService,
    },
    {
      provide: USER_DI_TOKEN.USER_LIST_OUTBOUND_PORT,
      useClass: UserListRepository,
    },

    //update
    {
      provide: USER_DI_TOKEN.USER_UPDATE_INBOUND_PORT,
      useClass: UserUpdateService,
    },
    {
      provide: USER_DI_TOKEN.USER_UPDATE_OUTBOUND_PORT,
      useClass: UserUpdateRepository,
    },

    //delete
    {
      provide: USER_DI_TOKEN.USER_DELETE_INBOUND_PORT,
      useClass: UserDeleteService,
    },
    {
      provide: USER_DI_TOKEN.USER_DELETE_OUTBOUND_PORT,
      useClass: UserDeleteRepository,
    },
  ],
  exports: [
    USER_DI_TOKEN.USER_CREATE_OUTBOUND_PORT,
    USER_DI_TOKEN.USER_LIST_OUTBOUND_PORT,
    USER_DI_TOKEN.USER_UPDATE_OUTBOUND_PORT,
    USER_DI_TOKEN.USER_GET_OUTBOUND_PORT,
  ],
})
export class UserModule {}
