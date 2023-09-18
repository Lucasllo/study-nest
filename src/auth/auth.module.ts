import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'kkhJaEB3NBE$4Kf746nCQm!e#ySLJ!dP',
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
