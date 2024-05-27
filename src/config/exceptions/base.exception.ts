import { DescriptionAndOptions, HttpException } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor(
    message: string,
    status: number,
    exceptionDescription?: DescriptionAndOptions,
  ) {
    super(message, status, exceptionDescription);
  }
}
