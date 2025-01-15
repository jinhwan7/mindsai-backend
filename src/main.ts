import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { combineContract } from './tsRestContract/combine-contract';
import { generateOpenApi } from '@ts-rest/open-api';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port: number = configService.get<number>('app.http.port');
  const host: string = configService.get<string>('app.http.host');
  const allowedOrigin: string = configService.get<string>(
    'app.http.allowedOrigin',
  );
  const logger = new Logger();
  const allowedOriginArray = allowedOrigin.split(',');
  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter(configService));

  const openApiDocument = generateOpenApi(combineContract, {
    info: {
      title: 'mindsai server',
      version: '0.0.1',
    },
  });

  SwaggerModule.setup('api-docs', app, openApiDocument);
  app.enableCors({
    origin: allowedOriginArray,
    methods: '*',
    credentials: true,
  });

  await app.listen(port, host);
  logger.log(`==========================================================`);
  logger.log(`Environment Variable ${process.env.APP_ENV}`, 'NestApplication');
  logger.log(`==========================================================`);
  logger.log(`Http Server running on ${await app.getUrl()}`, 'NestApplication');
  logger.log(`==========================================================`);
}
bootstrap();
