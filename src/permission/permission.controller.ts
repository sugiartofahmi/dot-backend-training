import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.permissionService.findOne(Number(id));
  }

  @Get()
  async findMany() {
    return await this.permissionService.findMany();
  }

  @Post()
  async create(@Body() data: CreatePermissionDto) {
    return await this.permissionService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdatePermissionDto) {
    return await this.permissionService.update({ id: Number(id), ...data });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.permissionService.delete(Number(id));
  }
}
