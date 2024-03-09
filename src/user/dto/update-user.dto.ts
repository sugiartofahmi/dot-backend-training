import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { EUserStatus } from '../../common/entities/enums/user.enum';
import { RoleEntitiy } from '../../common/database/entity/role.entity';

export class UpdateUseDto {
  @IsString()
  @IsOptional()
  @MinLength(1)
  fullname: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  password: string;

  @IsOptional()
  @IsEnum(EUserStatus)
  status: EUserStatus;

  @IsOptional()
  @IsArray()
  roles: RoleEntitiy[];
}
