import { Module } from "@nestjs/common";
import { UserRepository } from "./Storage/User.repository";
import { UserEntity } from "./Storage/Entity/User.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FindByIdUserTransformer } from "./Transformers/FindByIdUser.transformer";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepository, FindByIdUserTransformer],
  exports: [UserRepository],
})
export class UserModule {}
