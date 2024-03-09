import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './common/database/config/type-orm.config';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    PermissionModule,
    RoleModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
