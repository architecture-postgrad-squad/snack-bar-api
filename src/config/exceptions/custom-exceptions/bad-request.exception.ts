import { BaseException } from '@/config/exceptions/base.exception';
import { IExceptionDescription } from '@/config/exceptions/interface/exception-description.interface';
import { HttpStatus } from '@nestjs/common';

export class BadRequestException extends BaseException {
  constructor(exceptionDescription?: IExceptionDescription) {
    super('Invalid body request', HttpStatus.BAD_REQUEST, exceptionDescription);
  }
}
