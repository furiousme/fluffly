import { UserService } from 'src/user/user.service';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
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
