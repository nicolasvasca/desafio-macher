import { Module } from "@nestjs/common";
import { UserRepository } from "./Storage/User.repository";
import { UserEntity } from "./Storage/Entity/User.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FindByIdUserTransformer } from "./Transformers/FindByIdUser.transformer";
import { FindByIdUserService } from "./Services/FindByIdUser.service";
import { FindByIdUserController } from "./Controllers/FindByIdUser.controller";
import { FindUserTransformer } from "./Transformers/FindUser.transformer";
import { FindUserService } from "./Services/FindUser.service";
import { FindUserController } from "./Controllers/FindUser.controller";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [FindByIdUserController, FindUserController],
  providers: [
    UserRepository,
    FindByIdUserTransformer,
    FindByIdUserService,
    FindUserTransformer,
    FindUserService,
  ],
  exports: [UserRepository],
})
export class UserModule {}
