import { NewsEntity } from 'src/modules/news/entities/news.entity';
import { Column, Entity, OneToMany } from 'typeorm';

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
    select: false,
  })
  password: string;

  @OneToMany(() => NewsEntity, (news) => news.author)
  news?: NewsEntity[];
}
