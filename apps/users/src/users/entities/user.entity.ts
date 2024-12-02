import { Entity, Column } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 300,
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 300,
    unique: true,
    nullable: true,
  })
  email: string;
}
