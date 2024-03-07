import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;
}

export class UpdatePermissionDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;
}
