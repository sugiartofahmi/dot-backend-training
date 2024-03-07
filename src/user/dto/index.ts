import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { EUserStatus } from 'src/common';

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
}

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
}
