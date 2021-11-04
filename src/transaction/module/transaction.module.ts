import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionResolver } from '../resolver/transaction.resolver';
import { TransactionService } from '../service/transaction.service';
import { Transaction, TransactionSchema } from "../schema/transaction.schema";
import { User, UserSchema } from 'src/users/schemas/users.schemas';
import { AuthModule } from 'src/auth/module/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {name: Transaction.name, schema: TransactionSchema},
        {name: User.name, schema: UserSchema}
      ]
    ),
    AuthModule
  ],
  providers: [TransactionResolver, TransactionService]
})
export class TransactionModule {}
