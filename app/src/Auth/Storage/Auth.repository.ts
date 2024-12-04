import {
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthEntity } from "./Entity/Auth.entity";

export class AuthRepository {
  constructor(
    @InjectRepository(AuthEntity)
    private repository: Repository<AuthEntity>
  ) {}

  async save(entity: Partial<AuthEntity>): Promise<Partial<AuthEntity>> {
    try {
      const user = await this.repository.create(entity);

      if (!user) {
        throw new ConflictException("Auth não criada");
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByLogin(login: string): Promise<Partial<AuthEntity>> {
    return await this.repository.findOne({ where: { login } });
  }
}
