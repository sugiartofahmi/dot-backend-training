import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;
}

export class UpdatePermissionDto {
  @IsString()
  @IsOptional()
  @MinLength(1)
  name: string;
}
