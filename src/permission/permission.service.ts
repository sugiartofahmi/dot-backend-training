import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionEntitiy } from '../common/database/entity/permission.entitiy';
import {
  TCreatePermissionRequest,
  TPermissionResponse,
  TPermissionSingleResponse,
  TUpdatePermissionRequest,
} from '../common/entities/types/permission.type';
@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntitiy)
    private readonly permissionRepository: Repository<PermissionEntitiy>,
  ) {}
  async findOne(id: number): Promise<TPermissionSingleResponse> {
    const res = await this.permissionRepository.findOne({
      where: { id: id },
    });
    if (!res) {
      throw new NotFoundException(`Id tidak ditemukan`);
    }
    return { message: 'Berhasil mengambil data', data: res };
  }

  async findMany(): Promise<TPermissionResponse> {
    const res = await this.permissionRepository.find();
    return { message: 'Berhasil mengambil data', data: res };
  }

  async create(
    data: TCreatePermissionRequest,
  ): Promise<TPermissionSingleResponse> {
    const permission = await this.permissionRepository.create(data);
    const res = await this.permissionRepository.save(permission);
    if (!res) {
      throw new BadRequestException('Gagal menambahkan permission');
    }
    return { message: 'Berhasil menambahkan permission', data: res };
  }
  async update(
    data: TUpdatePermissionRequest,
  ): Promise<TPermissionSingleResponse> {
    const { id, ...resData } = data;
    const permission = await this.findOne(id);
    const res = await this.permissionRepository.save({
      id: permission.data.id,
      ...resData,
    });

    if (!res) {
      throw new NotFoundException(`Gagal update permission`);
    }
    return { message: 'Berhasil update permission', data: res };
  }

  async delete(id: number): Promise<TPermissionSingleResponse> {
    const permission = await this.findOne(id);
    const res = await this.permissionRepository.remove({
      id: permission.data.id as number,
      name: permission.data.name,
    });
    if (!res) {
      throw new NotFoundException(`Id tidak ditemukan`);
    }
    return { message: 'Berhasil menghapus permission', data: res };
  }
}
