import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UserEntity {
  @Column('uuid', {
    generated: 'uuid',
    primary: true,
    comment: 'Идентификатор',
  })
  id: string;

  @Column('varchar', {
    nullable: false,
    comment: 'Электронная почта',
  })
  email: string;

  @Column('varchar', {
    nullable: false,
    comment: 'Пароль',
  })
  @Exclude()
  password: string;
}
