import { DataSource } from 'typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSource = new DataSource({
  type: 'sqlite',
  entities: [join(process.cwd(), '/dist/**/*.entity.js')],
  database: './data/data.sqlite',
  synchronize: true,
});
