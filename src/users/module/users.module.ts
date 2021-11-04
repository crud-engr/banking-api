import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/users.schemas';
import { UsersResolver } from '../resolver/users.resolver';
import { UsersService } from '../service/users.service';

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    providers: [UsersResolver, UsersService],
})
export class UsersModule {}
