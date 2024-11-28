import { UserService } from 'src/user/user.service';
import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { verify } from 'argon2';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtRefreshConfig from 'src/configs/jwt-refresh.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(jwtRefreshConfig.KEY)
    private readonly refreshTokenConfig: ConfigType<typeof jwtRefreshConfig>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.findByEmail(createUserDto.email);
    if (user) throw new ConflictException('User already exists');
    return this.userService.create(createUserDto);
  }

  async validateLocalUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');
    const isPasswordValid = await verify(user.password, password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');
    return { id: user.id, email: user.email };
  }

  // todo: pass only necessary fields instead of User
  async generateTokensPair(user: User) {
    const { id } = user;
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({ sub: id }),
      this.jwtService.signAsync({ sub: id }, this.refreshTokenConfig),
    ]);
    return { accessToken, refreshToken };
  }

  async validateJwtUser(id: string) {
    const user = await this.userService.findOne(id);
    if (!user) throw new UnauthorizedException('User not found');
    return { id: user.id };
  }

  async validateJwtRefreshUser(id: string) {
    const user = await this.userService.findOne(id);
    if (!user) throw new UnauthorizedException('User not found');
    return { id: user.id };
  }

  async refreshTokens(user: User) {
    return this.generateTokensPair(user);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
