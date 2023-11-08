import { UserEntity } from 'src/modules/administration/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('news')
export class NewsEntity {
  @Column('uuid', {
    generated: 'uuid',
    primary: true,
    comment: 'Идентификатор',
  })
  id: string;

  @Column('text', {
    comment: 'Заголовок',
    nullable: true,
  })
  header: string | null;

  @Column('text', {
    comment: 'Содержимое новости',
    nullable: false,
  })
  body: string;

  @Column('uuid', {
    nullable: false,
    comment: 'Автор',
  })
  authorId: string;

  @Column('int', {
    nullable: false,
    comment: 'Дата создания',
  })
  createdAt: number;

  @Column('int', {
    nullable: true,
    comment: 'Дата последнего обновления',
  })
  updatedAt: number;

  @ManyToOne(() => UserEntity)
  author?: UserEntity;
}
