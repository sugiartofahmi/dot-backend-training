import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { EUserStatus } from '../../common/entities/enums/user.enum';
import { RoleEntitiy } from '../../common/database/entity/role.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  fullname: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  password: string;

  @IsOptional()
  @IsEnum(EUserStatus)
  status: EUserStatus;

  @IsOptional()
  @IsArray()
  roles: RoleEntitiy[];
}
