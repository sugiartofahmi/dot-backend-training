import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  EOrderBy,
  EUserSortingBy,
  RoleEntitiy,
  TPaginationRequest,
} from '../../common/';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  UserEntitiy,
  TUserRequest,
  TUserResponse,
  TUserSingleResponse,
  encryptPassword,
} from '../../common/';

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
    return { data: res, message: 'Berhasil mengambil data' };
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
    const [res, count] = await Promise.all([
      this.userRepository.find({
        where: [
          search && {
            fullname: ILike(`%${search}%`),
            ...(status && { status }),
          },
          search && {
            email: ILike(`%${search}%`),
            ...(status && { status }),
          },
        ],
        relations: {
          roles: {
            permissions: true,
          },
        },
        order: {
          [sortingBy]: [orderBy],
        },
        take: Number(perPage),
        skip: (Number(page) - 1) * Number(perPage),
      }),
      await this.userRepository
        .find({
          select: {
            id: true,
          },
          where: [
            search && {
              fullname: ILike(`%${search}%`),
              ...(status && { status }),
            },
            search && {
              email: ILike(`%${search}%`),
              ...(status && { status }),
            },
          ],
          take: Number(perPage),
          skip: (Number(page) - 1) * Number(perPage),
        })
        .then((res) => res.length),
    ]);
    const lastPage = Math.ceil(count / Number(perPage));
    return {
      data: res,
      message: 'Berhasil mengambil data',
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

  async create(data: TUserRequest): Promise<TUserSingleResponse> {
    const { roles, ...resdata } = data;
    const user = await this.userRepository.create(resdata);
    const findRoles = roles && (await this.roleRepository.findByIds(roles));

    user.roles = roles && findRoles;
    const res = await this.userRepository.save(user);
    if (!res) {
      throw new BadRequestException('Gagal menambahkan user');
    }
    return { data: res, message: 'Berhasil menambahkan user' };
  }
  async update(data: TUserRequest): Promise<TUserSingleResponse> {
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
    return { data: res, message: 'Berhasil update user' };
  }

  async delete(id: string): Promise<TUserSingleResponse> {
    const findUser = await this.findOne(id);
    const res = await this.userRepository.remove({
      id: findUser.data.id as string,
      fullname: findUser.data.fullname,
      password: findUser.data.password,
      status: findUser.data.status,
      email: findUser.data.email,
      roles: findUser.data.roles,
      hashPasword: async () => {},
    });
    if (!res) {
      throw new NotFoundException(`Id tidak ditemukan`);
    }
    return { data: res, message: 'Berhasil menghapus user' };
  }
}
