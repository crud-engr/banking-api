import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpResolver } from '../resolver/otp.resolver';
import { OtpService } from '../service/otp.service';
import { Otp, OtpSchema } from '../schema/otp.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Otp.name, schema: OtpSchema}])],
  providers: [OtpResolver, OtpService]
})
export class OtpModule {}
