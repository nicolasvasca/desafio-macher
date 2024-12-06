import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import MockRepository from "../../Mocks/Repository.mock";
import { UserEntity } from "../../../src/User/Storage/Entity/User.entity";
import { DataSource } from "typeorm";
import MockEnv from "../../Mocks/Env.mock";
import { UserRepository } from "../../../src/User/Storage/User.repository";
import { FindByIdUserTransformer } from "../../../src/User/Transformers/FindByIdUser.transformer";
import { FindUserService } from "../../../src/User/Services/FindUser.service";
import { FindUserTransformer } from "../../../src/User/Transformers/FindUser.transformer";
import { FindByIdUserService } from "../../../src/User/Services/FindByIdUser.service";
import { DeleteUserService } from "../../../src/User/Services/DeleteUser.service";
import { DeleteUserTransformer } from "../../../src/User/Transformers/DeleteUser.transformer";
import MockUser from "../../Mocks/User.mock";
import { UserDeletedLogRepository } from "../../../src/UserDeletedLog/Storage/UserDeletedLog.repository";
import { UserDeletedLogEntity } from "../../../src/UserDeletedLog/Storage/Entity/UserDeletedLog.entity";

MockEnv.mock();

describe("FindUserService", () => {
  let service: FindUserService;
  let mockUserRepository = MockRepository.mockRepository();
  let mockUserLogRepository = MockRepository.mockRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
        {
          provide: DataSource,
          useValue: {
            getRepository: jest.fn().mockReturnValue(mockUserRepository),
          },
        },
        FindUserService,
        FindUserTransformer,
        FindByIdUserService,
        FindByIdUserTransformer,
        DeleteUserService,
        DeleteUserTransformer,
        UserDeletedLogRepository,
        {
          provide: getRepositoryToken(UserDeletedLogEntity),
          useValue: mockUserLogRepository,
        },
      ],
    }).compile();

    service = module.get<FindUserService>(FindUserService);
  });

  beforeEach(() => {
    mockUserRepository = MockRepository.resetMocks(mockUserRepository);
    mockUserLogRepository = MockRepository.resetMocks(mockUserLogRepository);
  });

  it("should Be defined", () => {
    expect(service).toBeDefined();
  });

  it("should be return user", async () => {
    const dto = MockUser.mockUserDto();
    const entity = MockUser.mockUserEntity();
    mockUserRepository.find.mockReturnValue([entity, entity]);
    const response = await service.invoke(dto);
    expect(response).toHaveLength(2);
    expect(mockUserRepository.find).toHaveBeenCalledTimes(1);
  });

  it("should be return user", async () => {
    const dto = MockUser.mockUserDto();
    mockUserRepository.find.mockReturnValue([]);
    const response = await service.invoke(dto);
    expect(response).toHaveLength(0);
    expect(mockUserRepository.find).toHaveBeenCalledTimes(1);
  });
});
