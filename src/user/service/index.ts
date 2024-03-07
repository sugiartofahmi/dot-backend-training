import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TPaginationRequest } from '../../common/';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntitiy } from '../../common/';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntitiy)
    private readonly userRepository: Repository<UserEntitiy>,
  ) {}
  async findOne(id: string) {
    const res = await this.userRepository.findOne({ where: { id: id } });
    if (!res) {
      throw new NotFoundException(`Id tidak ditemukan`);
    }
    return res;
  }

  async findMany(query: TPaginationRequest) {
    return await this.userRepository.find();
  }

  async create(data: any) {
    const res = await this.userRepository.create(data);
    if (!res) {
      throw new BadRequestException('Gagal menambahkan user');
    }
    await this.userRepository.save(res);
    return res;
  }
  async update(data: any) {
    const { id, ...resData } = data;
    const res = await this.userRepository.update(id, resData);
    if (!res) {
      throw new NotFoundException(`Gagal update user`);
    }
    return res;
  }

  async delete(id: string) {
    const res = await this.userRepository.delete(id);
    if (!res) {
      throw new NotFoundException(`Id tidak ditemukan`);
    }
    return res;
  }
}
