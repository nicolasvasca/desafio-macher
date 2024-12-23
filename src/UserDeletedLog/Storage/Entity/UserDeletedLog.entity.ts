import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("log-usuario-deletado")
export class UserDeletedLogEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({})
  id_usuario: string;

  @Column({})
  id_usuario_deletado: string;

  @CreateDateColumn({ name: "criado_em" })
  criado_em: Date;
}
