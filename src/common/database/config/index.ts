import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { RoleEntitiy, UserEntitiy, PermissionEntitiy } from '../entity';

export const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: process.env['DB_NAME'],
  host: process.env['DB_HOST'],
  port: Number(process.env['DB_PORT']),
  username: process.env['DB_USER'],
  password: process.env['DB_PASSWORD'],
  entities: [RoleEntitiy, UserEntitiy, PermissionEntitiy],
  synchronize: true,
};
