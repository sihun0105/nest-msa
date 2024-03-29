import { Body, Controller, Post } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { convertToUserEntity } from './users.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    try {
      const userDataObservable = this.authService.login({ ...loginDto });
      const data = await firstValueFrom(userDataObservable);
      const user = convertToUserEntity(data);
      return user;
    } catch (error) {
      throw new RpcException({
        code: error.code,
        message: error.details,
      });
    }
  }
}
