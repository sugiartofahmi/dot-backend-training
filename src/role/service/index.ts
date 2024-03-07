import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntitiy } from '../../common/';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntitiy)
    private readonly roleRepository: Repository<RoleEntitiy>,
  ) {}
  async findOne(id: string) {
    const res = await this.roleRepository.findOne({ where: { id: id } });
    if (!res) {
      throw new NotFoundException(`Id tidak ditemukan`);
    }
    return res;
  }

  async findMany() {
    return await this.roleRepository.find();
  }

  async create(data: any) {
    const res = await this.roleRepository.create(data);
    await this.roleRepository.save(res);
    if (!res) {
      throw new BadRequestException('Gagal menambahkan role');
    }
    return res;
  }
  async update(data: any) {
    const { id, ...resData } = data;
    const res = await this.roleRepository.update(id, resData);
    if (!res) {
      throw new NotFoundException(`Gagal update role`);
    }
    return res;
  }

  async delete(id: string) {
    const res = await this.roleRepository.delete(id);
    if (!res) {
      throw new NotFoundException(`Id tidak ditemukan`);
    }
    return res;
  }
}
