import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RoleService } from '../service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async findOne(@Param() id: string) {
    return await this.roleService.findOne(id);
  }
  @Get()
  async findMany() {
    return await this.roleService.findMany();
  }

  @Post()
  async create() {
    return await this.roleService.create();
  }

  @Patch()
  async update() {
    return await this.roleService.update();
  }

  @Delete()
  async delete() {
    return await this.roleService.delete();
  }
}
