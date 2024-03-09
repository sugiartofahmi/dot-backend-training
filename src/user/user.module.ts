import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntitiy } from '../common/database/entity/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntitiy])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
