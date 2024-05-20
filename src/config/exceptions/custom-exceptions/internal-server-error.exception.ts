import { BaseException } from '@/config/exceptions/base.exception';
import { IExceptionDescription } from '@/config/exceptions/interface/exception-description.interface';
import { HttpStatus } from '@nestjs/common';

export class InternalServerErrorException extends BaseException {
  constructor(exceptionDescription?: IExceptionDescription) {
    super(
      'Internal Server Error Exception',
      HttpStatus.INTERNAL_SERVER_ERROR,
      exceptionDescription,
    );
  }
}
