
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Customer } from "./Customer";

export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

@Entity("transcation")
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "enum", enum: TransactionType })
  type!: string;

  @Column({ type: "numeric" })
  amount!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(() => Customer, (customer) => customer.transactions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: 'customer_id'})
  customer!: Customer;
}
