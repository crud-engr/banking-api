import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Otp, OtpSchema } from 'src/otp/schema/otp.schema';
import { UsersModule } from 'src/users/module/users.module';
import { User, UserSchema } from 'src/users/schemas/users.schemas';
import { AuthResolver } from '../resolver/auth.resolver';
import { AuthService } from '../service/auth.service';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: "banking-api-backend-project",
      signOptions: {
        expiresIn: 3600
      }
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Otp.name, schema: OtpSchema }
    ]
  )],
  providers: [AuthResolver, AuthService],
  exports: [PassportModule]
})
export class AuthModule {}
