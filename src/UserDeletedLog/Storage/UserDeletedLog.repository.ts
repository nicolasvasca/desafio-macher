import {
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDeletedLogEntity } from "./Entity/UserDeletedLog.entity";

export class UserDeletedLogRepository {
  constructor(
    @InjectRepository(UserDeletedLogEntity)
    private repository: Repository<UserDeletedLogEntity>
  ) {}

  async save(
    entity: Partial<UserDeletedLogEntity>
  ): Promise<Partial<UserDeletedLogEntity>> {
    try {
      const user = await this.repository.save(entity);

      if (!user) {
        throw new ConflictException("Log não criado");
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
