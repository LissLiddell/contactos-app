import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Contact } from '../entities/Contact';
import { OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts!: Contact[];
}

