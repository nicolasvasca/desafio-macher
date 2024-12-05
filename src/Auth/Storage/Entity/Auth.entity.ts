import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("auth")
export class AuthEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  login: string;

  @Column()
  senha: string;

  @Column({ unique: true })
  id_usuario: string;

  @CreateDateColumn({ name: "criado_em" })
  criadoEm: Date;

  @UpdateDateColumn({ name: "atualizado_em" })
  atualizadoEm: Date;
}
