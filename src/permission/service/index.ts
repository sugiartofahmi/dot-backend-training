import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionEntitiy } from '../../common/';
@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntitiy)
    private readonly permissionRepository: Repository<PermissionEntitiy>,
  ) {}
  async findOne(id: string) {
    const res = await this.permissionRepository.findOne({ where: { id: id } });
    if (!res) {
      throw new NotFoundException(`Id tidak ditemukan`);
    }
    return res;
  }

  async findMany() {
    return await this.permissionRepository.find();
  }

  async create(data: any) {
    const res = await this.permissionRepository.create(data);
    await this.permissionRepository.save(res);
    if (!res) {
      throw new BadRequestException('Gagal menambahkan permission');
    }
    return res;
  }
  async update(data: any) {
    const { id, ...resData } = data;
    const res = await this.permissionRepository.update(id, resData);
    if (!res) {
      throw new NotFoundException(`Gagal update permission`);
    }
    return res;
  }

  async delete(id: string) {
    const res = await this.permissionRepository.delete(id);
    if (!res) {
      throw new NotFoundException(`Id tidak ditemukan`);
    }
    return res;
  }
}
