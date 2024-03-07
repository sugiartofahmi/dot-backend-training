import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { encryptPassword } from '../../../utilities';
import { RoleEntitiy } from '../role';
import { EUserStatus } from '../../../entities';

@Entity('user')
export class UserEntitiy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  fullname: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: EUserStatus.ACTIVE })
  status: string;

  @ManyToMany(() => RoleEntitiy)
  @JoinTable()
  roles: RoleEntitiy[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPasword() {
    if (this.password) {
      this.password = await encryptPassword(this.password);
    }
  }
}
