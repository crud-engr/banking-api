import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/module/users.module';
import { OtpModule } from './otp/module/otp.module';
import { AuthModule } from './auth/module/auth.module';
import { TransactionModule } from './transaction/module/transaction.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/banking', {useUnifiedTopology: true, useNewUrlParser: true}),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      introspection: true,
      context: ({req}) => ({headers: req.headers})
    }),
    UsersModule,
    OtpModule,
    AuthModule,
    TransactionModule,
  ],
})

export class AppModule {}
