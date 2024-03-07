import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntitiy, RoleEntitiy } from '../../common/';
import {
  TRoleRequest,
  TRoleResponse,
  TRoleSingleResponse,
} from 'src/common/entities/types/role';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntitiy)
    private readonly roleRepository: Repository<RoleEntitiy>,
    @InjectRepository(PermissionEntitiy)
    private readonly permissionRepository: Repository<PermissionEntitiy>,
  ) {}
  async findOne(id: number): Promise<TRoleSingleResponse> {
    const res = await this.roleRepository.findOne({
      where: { id: id },
      relations: {
        permissions: true,
      },
    });
    if (!res) {
      throw new NotFoundException(`Id tidak ditemukan`);
    }
    return {
      message: 'Berhasil mengambil data',
      data: res,
    };
  }

  async findMany(): Promise<TRoleResponse> {
    const res = await this.roleRepository.find({
      relations: {
        permissions: true,
      },
    });
    return {
      message: 'Berhasil mengambil data',
      data: res,
    };
  }

  async create(data: TRoleRequest): Promise<TRoleSingleResponse> {
    const { permissions, ...resData } = data;
    const role = await this.roleRepository.create(resData);
    const findPermissions =
      await this.permissionRepository.findByIds(permissions);
    role.permissions = findPermissions;
    const res = await this.roleRepository.save(role);

    if (!res) {
      throw new BadRequestException('Gagal menambahkan role');
    }
    return {
      message: 'Berhasil menambahkan role',
      data: res,
    };
  }
  async update(data: TRoleRequest): Promise<TRoleSingleResponse> {
    const { id, permissions, ...resData } = data;
    const findRole = await this.findOne(id);
    const findPermissions =
      permissions && (await this.permissionRepository.findByIds(permissions));

    const res = await this.roleRepository.save({
      ...findRole.data,
      ...resData,
      ...(permissions && { permissions: findPermissions }),
    });
    if (!res) {
      throw new NotFoundException(`Gagal update role`);
    }
    return {
      message: 'Berhasil update role',
      data: res,
    };
  }

  async delete(id: number): Promise<TRoleSingleResponse> {
    const findRole = await this.findOne(id);
    const res = await this.roleRepository.remove({
      id: findRole.data.id as number,
      name: findRole.data.name,
      permissions: findRole.data.permissions,
    });
    if (!res) {
      throw new NotFoundException(`Id tidak ditemukan`);
    }
    return {
      message: 'Berhasil menghapus role',
      data: res,
    };
  }
}
