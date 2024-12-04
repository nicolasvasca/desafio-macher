import {
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./Entity/User.entity";

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>
  ) {}

  async save(entity: Partial<UserEntity>): Promise<Partial<UserEntity>> {
    try {
      const user = await this.repository.create(entity);

      if (!user) {
        throw new ConflictException("Usuário não criado");
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findById(id: string): Promise<Partial<UserEntity>> {
    return await this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<Partial<UserEntity>> {
    return await this.repository.findOne({ where: { email } });
  }

  async findByTaxId(taxId: string): Promise<Partial<UserEntity>> {
    return await this.repository.findOne({ where: { cpf: taxId } });
  }
}
