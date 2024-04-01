import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ReplyModule } from './reply/reply.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.development',

      cache: true,
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    ReplyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
