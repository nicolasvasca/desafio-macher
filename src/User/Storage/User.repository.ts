import {
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./Entity/User.entity";
import { FindUserDto } from "../Dto/FindUser.dto";

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>
  ) {}

  async save(entity: Partial<UserEntity>): Promise<Partial<UserEntity>> {
    try {
      const user = await this.repository.save(entity);

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

  async find(search: FindUserDto): Promise<Partial<UserEntity>[]> {
    const query: any = {};
    if (search.status) {
      query.status = search.status;
    }
    if (search.type) {
      query.tipo = search.type;
    }
    return await this.repository.find({ where: query });
  }
}
