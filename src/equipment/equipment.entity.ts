import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn() 
  id: number;

  @Column() 
  name: string;

  @Column()
  brand: string; 

  @Column()
  model: string;

  @Column() 
  type: string;

  @Column() 
  status: string;

  @Column()
  quantity: number;
}
