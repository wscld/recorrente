import { Module } from '@nestjs/common';
import { UserService } from 'src/user/services/user/user.service';
import { UserModule } from 'src/user/user.module';
import { LocalStategy } from './local.strategy';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtConstants } from './jwt.constants';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    secret: JwtConstants.secret,
    signOptions: { expiresIn: '1d' }
  })],
  providers: [AuthService, LocalStategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
