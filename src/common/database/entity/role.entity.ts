import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PermissionEntitiy } from './permission.entitiy';
@Entity('role')
export class RoleEntitiy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @ManyToMany(() => PermissionEntitiy)
  @JoinTable()
  permissions: PermissionEntitiy[];
}
