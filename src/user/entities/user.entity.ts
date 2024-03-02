import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // 标记为主列，值自动生成

  @Column({ length: 50 })
  username: string;

  // select: false 表示进行查询时默认隐藏此列
  @Column({ nullable: true, select: false })
  // @Exculde: 对返回的数据实现过滤掉password字段
  @Exclude()
  password: string;

  @Column({ default: '' })
  avatar_url: string;

  @Column('simple-enum', { enum: ['root', 'visitor'], default: "visitor" })
  role: string;   // 用户角色

  @Column({ type: 'timestamp',name:'create_time', default: () => "CURRENT_TIMESTAMP" })
  createTime: Date

  @Column({ type: 'timestamp', name:'update_time', default: () => "CURRENT_TIMESTAMP" })
  updateTime: Date

  @BeforeInsert()
  async encryptPwd() {
    console.log('=====beforeInsert====')
    this.password = await bcrypt.hashSync(this.password, 10);
  }
}
