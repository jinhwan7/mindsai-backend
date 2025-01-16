import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uniqueName: string;

  @Column()
  nickName: string;

  @Column()
  password: string;

  
} 