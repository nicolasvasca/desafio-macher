import { Module } from "@nestjs/common";
import { UserRepository } from "./Storage/User.repository";
import { UserEntity } from "./Storage/Entity/User.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FindByIdUserTransformer } from "./Transformers/FindByIdUser.transformer";
import { FindByIdUserService } from "./Services/FindByIdUser.service";
import { FindByIdUserController } from "./Controllers/FindByIdUser.controller";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [FindByIdUserController],
  providers: [UserRepository, FindByIdUserTransformer, FindByIdUserService],
  exports: [UserRepository],
})
export class UserModule {}
