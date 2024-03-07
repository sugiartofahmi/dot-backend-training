import { Injectable } from '@nestjs/common';
import { TPaginationRequest } from '../../common/';
@Injectable()
export class UserService {
  async findOne(id: string) {
    return;
  }

  async findMany(query: TPaginationRequest) {
    return;
  }

  async create() {
    return;
  }
  async update() {
    return;
  }

  async delete() {
    return;
  }
}
