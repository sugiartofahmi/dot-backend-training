import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { encryptPassword } from 'src/common/utilities';

@Entity()
export class UserEntitiy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  fullname: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  status: string;

  @BeforeInsert()
  async hashPasword() {
    this.password = await encryptPassword(this.password);
  }
}
