import { Module } from '@nestjs/common';
import { UserService, UserController } from './user';
import { RoleService, RoleController } from './role';
import { PermissionService, PermissionController } from './permission';
import { AuthService, AuthController } from './auth';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config, UserEntitiy, RoleEntitiy, PermissionEntitiy } from './common';
@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([UserEntitiy, RoleEntitiy, PermissionEntitiy]),
  ],
  controllers: [
    UserController,
    RoleController,
    PermissionController,
    AuthController,
  ],
  providers: [UserService, RoleService, PermissionService, AuthService],
})
export class AppModule {}
