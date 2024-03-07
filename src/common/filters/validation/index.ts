import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  BadRequestException,
} from '@nestjs/common';

@Catch(BadRequestException)
export class ValidationExceptionFilter
  implements ExceptionFilter<BadRequestException>
{
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const error = exception.response;

    response.status(error.statusCode).json({
      message: error.error,
      errors: error.message,
      statusCode: error.statusCode,
    });
  }
}
