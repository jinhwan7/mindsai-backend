import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uniqueName: string;

  @Column()
  nickName: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;
}
