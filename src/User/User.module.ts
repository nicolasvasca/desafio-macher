import { forwardRef, Module } from "@nestjs/common";
import { UserRepository } from "./Storage/User.repository";
import { UserEntity } from "./Storage/Entity/User.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FindByIdUserTransformer } from "./Transformers/FindByIdUser.transformer";
import { FindByIdUserService } from "./Services/FindByIdUser.service";
import { FindByIdUserController } from "./Controllers/FindByIdUser.controller";
import { FindUserTransformer } from "./Transformers/FindUser.transformer";
import { FindUserService } from "./Services/FindUser.service";
import { FindUserController } from "./Controllers/FindUser.controller";
import { DeleteUserTransformer } from "./Transformers/DeleteUser.transformer";
import { DeleteUserService } from "./Services/DeleteUser.service";
import { DeleteUserController } from "./Controllers/DeleteUser.controller";
import { UserDeletedLogModule } from "../UserDeletedLog/UserDeletedLog.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => UserDeletedLogModule),
  ],
  controllers: [
    FindByIdUserController,
    FindUserController,
    DeleteUserController,
  ],
  providers: [
    UserRepository,
    FindByIdUserTransformer,
    FindByIdUserService,
    FindUserTransformer,
    FindUserService,
    DeleteUserTransformer,
    DeleteUserService,
  ],
  exports: [UserRepository],
})
export class UserModule {}
