import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

export const User = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (request.user.length > 0) {
      return filter ? request.user[0][filter] : request.user[0];
    } else {
      throw new BadRequestException('Usuario não encontrado');
    }
  },
);
