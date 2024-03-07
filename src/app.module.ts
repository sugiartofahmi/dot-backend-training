import { Module } from '@nestjs/common';
import { UserService, UserController } from './user';
import { RoleService, RoleController } from './role';
import { PermissionService, PermissionController } from './permission';
import { AuthService, AuthController } from './auth';

@Module({
  imports: [],
  controllers: [
    UserController,
    RoleController,
    PermissionController,
    AuthController,
  ],
  providers: [UserService, RoleService, PermissionService, AuthService],
})
export class AppModule {}
