import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { TPaginationRequest } from '../common/entities/types/common.type';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUseDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Get()
  async findMany(@Query() query: TPaginationRequest) {
    return await this.userService.findMany(query);
  }

  @Post()
  async create(@Body() data: CreateUserDto) {
    return await this.userService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUseDto) {
    return await this.userService.update({ id, ...data });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
