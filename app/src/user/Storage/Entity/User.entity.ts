import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("usuarios")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  tipo: string;

  @Column()
  status: string;
}
