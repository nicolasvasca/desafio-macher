import { forwardRef, Module } from "@nestjs/common";
import { AuthRepository } from "./Storage/Auth.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthEntity } from "./Storage/Entity/Auth.entity";
import { JwtModule } from "@nestjs/jwt";
import { JwtAuthGuard } from "src/Api/Security/Guard/JWT.guard";
import { JwtStrategy } from "src/Api/Security/Strategies/JWT.strategies";
import { UserModule } from "src/User/User.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    forwardRef(() => UserModule),
  ],
  providers: [AuthRepository, JwtStrategy, JwtAuthGuard],
  exports: [AuthRepository],
})
export class AuthModule {}
