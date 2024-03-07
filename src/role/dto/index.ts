import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { PermissionEntitiy } from 'src/common';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @ArrayNotEmpty()
  @IsArray()
  permissions: PermissionEntitiy[];
}

export class UpdateRoleDto {
  @IsString()
  @IsOptional()
  @MinLength(1)
  name: string;

  @IsOptional()
  @IsArray()
  permissions: PermissionEntitiy[];
}
