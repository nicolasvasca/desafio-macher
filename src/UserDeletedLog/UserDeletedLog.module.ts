import { Module } from "@nestjs/common";
import { UserDeletedLogRepository } from "./Storage/UserDeletedLog.repository";
import { UserDeletedLogEntity } from "./Storage/Entity/UserDeletedLog.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([UserDeletedLogEntity])],
  providers: [UserDeletedLogRepository],
  exports: [UserDeletedLogRepository],
})
export class UserDeletedLogModule {}
