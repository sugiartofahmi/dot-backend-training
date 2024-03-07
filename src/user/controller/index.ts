import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from '../service';
import { TPaginationRequest } from '../../common/';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':id')
  async findOne(@Param() id: string) {
    return await this.userService.findOne(id);
  }

  @Get()
  async findMany(@Query() query: TPaginationRequest) {
    return await this.userService.findMany(query);
  }

  @Post()
  async create() {
    return await this.userService.create();
  }

  @Patch()
  async update() {
    return await this.userService.update();
  }

  @Delete()
  async delete() {
    return await this.userService.delete();
  }
}
