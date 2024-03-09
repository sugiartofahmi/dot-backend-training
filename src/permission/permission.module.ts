import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntitiy } from '../common/database/entity/permission.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntitiy])],
  providers: [PermissionService],
  controllers: [PermissionController],
})
export class PermissionModule {}
