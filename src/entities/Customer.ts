import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";
import { Transaction } from "./Transaction";
import { Personal } from "./utils/Personal";
import { Banker } from "./Banker";

@Entity("customer")
export class Customer extends Personal {
  @Column({ type: "numeric", default: 0})
  balance!: number;

  @Column({ type: "simple-json", nullable: true })
  info!: {
    age: number;
    hair_color: string;
  };

  @Column({ type: "simple-json", nullable: true })
  address!: {
    address: string;
    city: string;
    province: string;
    postcode: number;
  };

  @Column({ type: "simple-array", default: []})
  family_member!: string[];

  @OneToMany(() => Transaction, (transaction) => transaction.customer, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "customer_transaction" })
  transactions!: Transaction[];

  @ManyToMany(() => Banker, {
    cascade: true,
  })
  bankers!: Banker[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
