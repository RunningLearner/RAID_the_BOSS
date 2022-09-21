import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BossRaidHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number;

  @Column()
  enterTime: Date;

  @Column()
  endTime: Date;

  @Column()
  level: number;

  @ManyToOne(() => User, (user) => user.bossRaidHistories)
  user: User;
}
