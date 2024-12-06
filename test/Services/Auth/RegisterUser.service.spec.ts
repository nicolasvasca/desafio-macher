import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AuthEntity } from "../../../src/Auth/Storage/Entity/Auth.entity";
import MockRepository from "../../Mocks/Repository.mock";
import { UserEntity } from "../../../src/User/Storage/Entity/User.entity";
import { DataSource } from "typeorm";
import MockEnv from "../../Mocks/Env.mock";
import { AuthRepository } from "../../../src/Auth/Storage/Auth.repository";
import { UserRepository } from "../../../src/User/Storage/User.repository";
import { JwtService } from "@nestjs/jwt";
import { RegisterUserService } from "../../../src/Auth/Services/RegisterUser.service";
import { RegisterUserTransformer } from "../../../src/Auth/Tranformers/RegisterUser.tranformer";
import { LoginUserTransformer } from "../../../src/Auth/Tranformers/LoginUser.tranformer";
import { LoginUserService } from "../../../src/Auth/Services/LoginUser.service";
import MockAuth from "../../Mocks/Auth.mock";
import MockUser from "../../Mocks/User.mock";
import { ConflictException } from "@nestjs/common";

MockEnv.mock();

jest.mock("@nestjs/jwt", () => {
  return {
    JwtService: jest.fn().mockImplementation(() => {
      return {
        sign: jest.fn().mockReturnValue("mocked_token"), // Mock do método sign
      };
    }),
  };
});

describe("RegisterUserService", () => {
  let service: RegisterUserService;
  let mockAuthRepository = MockRepository.mockRepository();
  let mockUserRepository = MockRepository.mockRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUserService,
        RegisterUserTransformer,
        LoginUserService,
        LoginUserTransformer,
        AuthRepository,
        JwtService,
        {
          provide: getRepositoryToken(AuthEntity),
          useValue: mockAuthRepository,
        },
        UserRepository,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
        {
          provide: DataSource,
          useValue: {
            getRepository: jest.fn().mockReturnValue(mockAuthRepository),
          },
        },
      ],
    }).compile();

    service = module.get<RegisterUserService>(RegisterUserService);
  });

  beforeEach(() => {
    mockAuthRepository = MockRepository.resetMocks(mockAuthRepository);
    mockUserRepository = MockRepository.resetMocks(mockUserRepository);
  });

  it("should Be defined", () => {
    expect(service).toBeDefined();
  });

  it("should be create a user", async () => {
    const dto = MockAuth.mockAuthDto();
    const entity = MockAuth.mockAuthEntity();
    const userEntity = MockUser.mockUserEntity();
    mockUserRepository.findOne.mockReturnValue(null);
    mockUserRepository.save.mockReturnValue(userEntity);
    mockAuthRepository.save.mockReturnValue(entity);
    const response = await service.invoke(dto);
    expect(response.user.id).toBe(dto.user.id);
    expect(mockUserRepository.findOne).toHaveBeenCalledTimes(2);
    expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
    expect(mockAuthRepository.save).toHaveBeenCalledTimes(1);
  });

  it("should be return erro if find a user", async () => {
    const dto = MockAuth.mockAuthDto();
    const userEntity = MockUser.mockUserEntity();
    mockUserRepository.findOne.mockReturnValue(userEntity);
    await expect(service.invoke(dto)).rejects.toThrow(ConflictException);
    expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
  });
});
