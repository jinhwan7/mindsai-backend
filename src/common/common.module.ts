import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './db/entity/user.entity';
import appConfig from 'src/config/app.config';
import typeormConfig from 'src/config/typeorm.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('app.jwtSecretKey'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      load: [appConfig, typeormConfig],
      isGlobal: true,
      cache: true,
      envFilePath: 'src/.env',
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const isProd = configService.get<string>('app.env') === 'production';

        return {
          type: 'mysql',
          host: configService.get<string>('mysql-db.host'),
          username: configService.get<string>('mysql-db.user'),
          password: configService.get<string>('mysql-db.password'),
          database: configService.get<string>('mysql-db.database'),
          entities: [UserEntity],
          synchronize: !isProd,
        };
      },

      inject: [ConfigService],
    }),
  ],
})
export class CommonModule {}
