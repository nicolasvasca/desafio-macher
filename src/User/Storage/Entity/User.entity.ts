import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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

  @CreateDateColumn({ name: "criado_em" })
  criado_em: Date;

  @UpdateDateColumn({ name: "atualizado_em" })
  atualizado_em: Date;
}
