import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  TCreateUserRequest,
  TUpdateUserRequest,
} from '../common/entities/types/user.type';
import { TPaginationRequest } from '../common/entities/types/common.type';
import { EOrderBy } from '../common/entities/enums/common.enum';
import { EUserSortingBy } from '../common/entities/enums/user.enum';
import { RoleEntitiy } from '../common/database/entity/role.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntitiy } from '../common/database/entity/user.entity';
import { encryptPassword } from '../common/utilities/password.utils';
import {
  TUserResponse,
  TUserSingleResponse,
} from '../common/entities/types/user.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntitiy)
    private readonly userRepository: Repository<UserEntitiy>,
    @InjectRepository(RoleEntitiy)
    private readonly roleRepository: Repository<RoleEntitiy>,
  ) {}
  async findOne(id: string): Promise<TUserSingleResponse> {
    const res = await this.userRepository.findOne({
      where: { id: id },
      relations: {
        roles: {
          permissions: true,
        },
      },
    });
    if (!res) {
      throw new NotFoundException(`Id tidak ditemukan`);
    }
    return { message: 'Berhasil mengambil data', data: res };
  }

  async findMany(data: TPaginationRequest): Promise<TUserResponse> {
    const {
      page = 1,
      perPage = 10,
      orderBy = EOrderBy.ASC,
      sortingBy = EUserSortingBy.FULLNAME,
      search,
      status,
    } = data;
    const whereCondition =
      search && status
        ? [
            {
              fullname: ILike(`%${search}%`),
              status,
            },
            {
              email: ILike(`%${search}%`),
              status,
            },
          ]
        : search
          ? [
              {
                fullname: ILike(`%${search}%`),
              },
              {
                email: ILike(`%${search}%`),
              },
            ]
          : status && [{ status }];

    const [res, count] = await Promise.all([
      this.userRepository.find({
        where: whereCondition,
        relations: {
          roles: {
            permissions: true,
          },
        },
        order: {
          [sortingBy]: orderBy.toLocaleUpperCase(),
        },
        take: Number(perPage),
        skip: (Number(page) - 1) * Number(perPage),
      }),
      await this.userRepository
        .find({
          select: {
            id: true,
          },
          where: whereCondition,
          take: Number(perPage),
          skip: (Number(page) - 1) * Number(perPage),
        })
        .then((res) => res.length),
    ]);
    const lastPage = Math.ceil(count / Number(perPage));
    return {
      message: 'Berhasil mengambil data',
      data: res,
      meta: {
        total: count,
        totalPage: Math.ceil(count / Number(perPage)),
        lastPage,
        currentPage: Number(page),
        perPage: Number(perPage),
        prev: Number(page) > 1 ? Number(page) - 1 : null,
        next: Number(page) < lastPage ? Number(page) + 1 : null,
      },
    };
  }

  async create(data: TCreateUserRequest): Promise<TUserSingleResponse> {
    const { roles, ...resdata } = data;
    const user = await this.userRepository.create(resdata);
    const findRoles = roles && (await this.roleRepository.findByIds(roles));
    user.roles = roles && findRoles;
    const res = await this.userRepository.save(user);
    if (!res) {
      throw new BadRequestException('Gagal menambahkan user');
    }
    return { message: 'Berhasil menambahkan user', data: res };
  }
  async update(data: TUpdateUserRequest): Promise<TUserSingleResponse> {
    const { id, roles, password, ...resData } = data;
    const findUser = await this.findOne(id);
    const findRoles = roles && (await this.roleRepository.findByIds(roles));
    const res = await this.userRepository.save({
      ...findUser.data,
      ...resData,
      ...(password && { password: await encryptPassword(password) }),
      ...(roles && { roles: findRoles }),
    });
    if (!res) {
      throw new BadRequestException('Gagal update user');
    }
    return { message: 'Berhasil update user', data: res };
  }

  async delete(id: string): Promise<TUserSingleResponse> {
    const findUser = await this.findOne(id);
    const res = await this.userRepository.remove({
      ...findUser.data,
      hashPasword: async () => {},
    });
    if (!res) {
      throw new NotFoundException(`Id tidak ditemukan`);
    }
    return { message: 'Berhasil menghapus user', data: res };
  }
}
