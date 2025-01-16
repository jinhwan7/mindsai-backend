import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../../common/db/entity/user.entity';
import { TypeOrmCustomRepository } from 'src/common/db/typeOrmCustomRepository';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepository extends TypeOrmCustomRepository<UserEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, UserEntity); // 부모 클래스 초기화
  }

  //UserRepository가 Typeorm을 쓰다가 mongoose로 바뀐다면?
  //ProductRepository등 다른모듈은 다른 Orm이나  db를 사용할 경우?
  //위 경우고려해서 만들기
}
