import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Column({ nullable: true })
  notes!: string;

  @ManyToOne(() => User, (user) => user.contacts, { onDelete: 'CASCADE' })
  user!: User;
}