import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PermissionService } from '../service';

@Controller('pemission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  async findOne(@Param() id: string) {
    return await this.permissionService.findOne(id);
  }

  @Get()
  async findMany() {
    return await this.permissionService.findMany();
  }

  @Post()
  async create() {
    return await this.permissionService.create();
  }

  @Patch()
  async update() {
    return await this.permissionService.update();
  }

  @Delete()
  async delete() {
    return await this.permissionService.delete();
  }
}
