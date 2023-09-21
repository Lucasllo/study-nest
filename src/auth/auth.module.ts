import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'kkhJaEB3NBE$4Kf746nCQm!e#ySLJ!dP',
      // signOptions: { expiresIn: '7 days' }, usado para definir globalmente quanto tempo o jwt vai valer
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
