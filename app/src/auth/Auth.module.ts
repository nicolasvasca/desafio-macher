import { Module } from "@nestjs/common";
import { AuthRepository } from "./Storage/Auth.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthEntity } from "./Storage/Entity/Auth.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity])],
  providers: [AuthRepository],
  exports: [AuthRepository],
})
export class AuthModule {}
