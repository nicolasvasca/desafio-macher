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
  criadoEm: Date;

  @UpdateDateColumn({ name: "atualizado_em" })
  atualizadoEm: Date;
}
