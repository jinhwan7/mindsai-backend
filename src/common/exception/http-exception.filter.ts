import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly configService: ConfigService) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errResponse = exception.getResponse();

    if (status.toString()[0] === '5') {
      //웹훅등을 500번대 서버에러 관리자만 확인, 클라이언트로는 내용 넘어가지 않도록하기

      response.status(status).json('InternalServerErrorException');
      return;
    }

    response.status(status).json(errResponse);
    return;
  }
}
