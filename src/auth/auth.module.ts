import { Module } from '@nestjs/common';
import { AuthConfiguration } from './auth.configuration';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [AuthConfiguration, JwtStrategy],
})
export class AuthModule {}
