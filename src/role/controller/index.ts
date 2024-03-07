import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RoleService } from '../service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get(':id')
  async findOne(@Param() id: string) {
    return await this.roleService.findOne(id);
  }
  @Get()
  async findMany() {
    return await this.roleService.findMany();
  }

  @Post()
  async create(@Body() data: any) {
    return await this.roleService.create(data);
  }

  @Patch(':id')
  async update(@Param() id: string, @Body() data: any) {
    return await this.roleService.update({ id, ...data });
  }

  @Delete(':id')
  async delete(@Param() id: string) {
    return await this.roleService.delete(id);
  }
}
