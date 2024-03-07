import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PermissionEntitiy } from '../permission';
@Entity('role')
export class RoleEntitiy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @ManyToMany(() => PermissionEntitiy)
  @JoinTable()
  permissions: PermissionEntitiy[];
}
