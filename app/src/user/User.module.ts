import { Module } from "@nestjs/common";
import { UserRepository } from "./Storage/User.repository";
import { UserEntity } from "./Storage/Entity/User.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
