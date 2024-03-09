import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';
import { PermissionEntitiy } from '../../common/database/entity/permission.entitiy';

export class UpdateRoleDto {
  @IsString()
  @IsOptional()
  @MinLength(1)
  name: string;

  @IsOptional()
  @IsArray()
  permissions: PermissionEntitiy[];
}
