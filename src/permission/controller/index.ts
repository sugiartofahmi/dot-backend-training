import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PermissionService } from '../service';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.permissionService.findOne(id);
  }

  @Get()
  async findMany() {
    return await this.permissionService.findMany();
  }

  @Post()
  async create(@Body() data: any) {
    return await this.permissionService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return await this.permissionService.update({ id, ...data });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.permissionService.delete(id);
  }
}