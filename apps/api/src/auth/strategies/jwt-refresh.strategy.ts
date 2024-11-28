import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import jwtRefreshConfig from 'src/configs/jwt-refresh.config';
import { Inject } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { AuthJwtPayload } from 'src/types/auth-jwt-payload';

export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly authService: AuthService,
    @Inject(jwtRefreshConfig.KEY)
    private readonly jwtRefreshConfiguration: ConfigType<
      typeof jwtRefreshConfig
    >,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtRefreshConfiguration.secret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: AuthJwtPayload) {
    return await this.authService.validateJwtRefreshUser(payload.sub);
  }
}
