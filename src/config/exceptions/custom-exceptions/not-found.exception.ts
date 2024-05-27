import { BaseException } from '@/config/exceptions/base.exception';
import { IExceptionDescription } from '@/config/exceptions/interface/exception-description.interface';
import { HttpStatus } from '@nestjs/common';

export class NotFoundException extends BaseException {
  constructor(exceptionDescription?: IExceptionDescription) {
    super(
      'Identifier was not found in API database',
      HttpStatus.NOT_FOUND,
      exceptionDescription,
    );
  }
}
