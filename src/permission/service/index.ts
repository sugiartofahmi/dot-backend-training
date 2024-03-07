import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionEntitiy } from '../../common/';
import {
  TPermissionRequest,
  TPermissionResponse,
  TPermissionSingleResponse,
} from 'src/common/entities/types/permission';
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
    return { data: res, message: 'Berhasil mengambil data' };
  }

  async findMany(): Promise<TPermissionResponse> {
    const res = await this.permissionRepository.find();
    return { data: res, message: 'Berhasil mengambil data' };
  }

  async create(data: TPermissionRequest): Promise<TPermissionSingleResponse> {
    const permission = await this.permissionRepository.create(data);
    const res = await this.permissionRepository.save(permission);
    if (!res) {
      throw new BadRequestException('Gagal menambahkan permission');
    }
    return { data: res, message: 'Berhasil menambahkan permission' };
  }
  async update(data: TPermissionRequest): Promise<TPermissionSingleResponse> {
    const { id, ...resData } = data;
    const permission = await this.findOne(id);
    const res = await this.permissionRepository.save({
      id: permission.data.id,
      ...resData,
    });

    if (!res) {
      throw new NotFoundException(`Gagal update permission`);
    }
    return { data: res, message: 'Berhasil update permission' };
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
    return { data: res, message: 'Berhasil menghapus permission' };
  }
}
