import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Personal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ default: ""})
  password!: string;

  @Column({})
  firstname!: string;

  @Column({})
  lastname!: string;

  @Column({ unique: true, length: 15})
  card_number!: string;
}
