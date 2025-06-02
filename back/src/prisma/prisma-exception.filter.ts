import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erro interno no servidor';

    switch (exception.code) {
      case 'P2002':
        status = HttpStatus.CONFLICT;
        message = `Registro já existe (${exception.meta?.target})`;
        break;
      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = `Registro não encontrado`;
        break;
      case 'P2003':
        status = HttpStatus.BAD_REQUEST;
        message = `Violação de chave estrangeira`;
        break;
      default:
        message = exception.message;
        break;
    }

    response.status(status).json({
      statusCode: status,
      message,
      error: exception.code,
    });
  }
}
