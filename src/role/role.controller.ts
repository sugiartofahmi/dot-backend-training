import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.roleService.findOne(Number(id));
  }
  @Get()
  async findMany() {
    return await this.roleService.findMany();
  }

  @Post()
  async create(@Body() data: CreateRoleDto) {
    return await this.roleService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateRoleDto) {
    return await this.roleService.update({ id: Number(id), ...data });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.roleService.delete(Number(id));
  }
}
