import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { RegisterUserService } from "../../../src/Auth/Services/RegisterUser.service";
import { AuthModule } from "../../../src/Auth/Auth.module";
import { AuthEntity } from "../../../src/Auth/Storage/Entity/Auth.entity";
import MockRepository from "../../Mocks/Repository.mock";
import { UserEntity } from "../../../src/User/Storage/Entity/User.entity";
import { DataSource } from "typeorm";
process.env.JWT_SECRET = "desafio";

describe("RegisterUserService", () => {
  let service: RegisterUserService;
  let mockAuthRepository = MockRepository.mockRepository();
  let mockUserRepository = MockRepository.mockRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [
        RegisterUserService,
        {
          provide: getRepositoryToken(AuthEntity),
          useValue: mockAuthRepository,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<RegisterUserService>(RegisterUserService);
  });

  beforeEach(() => {
    mockAuthRepository = MockRepository.resetMocks(mockAuthRepository);
    mockUserRepository = MockRepository.resetMocks(mockUserRepository);
  });

  it("has been defined", () => {
    expect(service).toBeDefined();
  });
});
