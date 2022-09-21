import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BossRaidHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number;

  @CreateDateColumn()
  enterTime: Date;

  @UpdateDateColumn()
  endTime: Date;

  @Column()
  level: number;

  @ManyToOne(() => User, (user) => user.bossRaidHistories)
  user: User;
}
