import {
  Entity,
  Column,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { ClientState } from './client-state';

@Entity('client')
export class Client {
  @ObjectIdColumn()
  _id: ObjectId | string;

  @Column({ length: 20 })
  firstName: string;

  @Column({ length: 20 })
  lastName: string;

  @Column()
  state: ClientState = ClientState.ACTIVE;

  @Column({ unique: true })
  email: string;

  @Column({ length: 13 })
  phone: string;

  @Column({ unique: true })
  dni: string;

  @CreateDateColumn()
  crateDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
