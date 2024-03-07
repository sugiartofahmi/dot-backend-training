import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permission')
export class PermissionEntitiy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;
}
