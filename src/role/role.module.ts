import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntitiy } from '../common/database/entity/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntitiy])],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
