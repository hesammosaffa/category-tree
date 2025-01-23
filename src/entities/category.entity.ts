import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({type: 'varchar', nullable: true })
  parent_id: string | null;

  @ManyToOne(() => Category, category => category.subCategories)
  parent: Category;

  @OneToMany(() => Category, category => category.parent)
  subCategories: Category[];
}