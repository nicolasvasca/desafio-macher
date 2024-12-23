import { forwardRef, Module } from "@nestjs/common";
import { AuthRepository } from "./Storage/Auth.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthEntity } from "./Storage/Entity/Auth.entity";
import { JwtModule } from "@nestjs/jwt";
import { JwtAuthGuard } from "../Api/Security/Guard/JWT.guard";
import { JwtStrategy } from "../Api/Security/Strategies/JWT.strategies";
import { UserModule } from "../User/User.module";
import { RegisterUserController } from "./Controllers/RegisterUser.controller";
import { LoginUserController } from "./Controllers/LoginUser.controller";
import { RegisterUserTransformer } from "./Tranformers/RegisterUser.tranformer";
import { LoginUserTransformer } from "./Tranformers/LoginUser.tranformer";
import { LoginUserService } from "./Services/LoginUser.service";
import { RegisterUserService } from "./Services/RegisterUser.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "secret",
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [RegisterUserController, LoginUserController],
  providers: [
    AuthRepository,
    JwtStrategy,
    JwtAuthGuard,
    RegisterUserTransformer,
    LoginUserTransformer,
    RegisterUserService,
    LoginUserService,
  ],
})
export class AuthModule {}
