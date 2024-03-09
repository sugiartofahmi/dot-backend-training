import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { PermissionEntitiy } from '../../common/database/entity/permission.entitiy';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @ArrayNotEmpty()
  @IsArray()
  permissions: PermissionEntitiy[];
}
