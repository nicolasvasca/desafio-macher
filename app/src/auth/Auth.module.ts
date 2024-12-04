import { Module } from "@nestjs/common";
import { AuthRepository } from "./Storage/Auth.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthEntity } from "./Storage/Entity/Auth.entity";
import { JwtModule } from "@nestjs/jwt";
import { JwtAuthGuard } from "src/api/security/guard/jwt.guard";
import { JwtStrategy } from "src/api/security/strategies/jwt.strategies";

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [AuthRepository, JwtStrategy, JwtAuthGuard],
  exports: [AuthRepository],
})
export class AuthModule {}
