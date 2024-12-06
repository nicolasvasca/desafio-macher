import * as bcrypt from "bcrypt";
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
import { NotFoundException, UnauthorizedException } from "@nestjs/common";

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

jest.mock("bcrypt", () => ({
  compare: jest.fn(),
}));

describe("LoginUserService", () => {
  let service: LoginUserService;
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

    service = module.get<LoginUserService>(LoginUserService);
  });

  beforeEach(() => {
    mockAuthRepository = MockRepository.resetMocks(mockAuthRepository);
    mockUserRepository = MockRepository.resetMocks(mockUserRepository);
  });

  it("should Be defined", () => {
    expect(service).toBeDefined();
  });

  it("should be return login", async () => {
    const dto = MockAuth.mockAuthDto();
    const entity = MockAuth.mockAuthEntity();
    const userEntity = MockUser.mockUserEntity();
    mockUserRepository.findOne.mockReturnValue(userEntity);
    mockAuthRepository.findOne.mockReturnValue(entity);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    const response = await service.invoke(dto);
    expect(response.user.id).toBe(dto.user.id);
    expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
  });

  it("should be return unatorizathion if password incorret", async () => {
    const dto = MockAuth.mockAuthDto();
    const entity = MockAuth.mockAuthEntity();
    mockAuthRepository.findOne.mockReturnValue(entity);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);
    await expect(service.invoke(dto)).rejects.toThrow(UnauthorizedException);
    expect(mockAuthRepository.findOne).toHaveBeenCalledTimes(1);
  });

  it("should be return unatorizathion if login not found incorret", async () => {
    const dto = MockAuth.mockAuthDto();
    mockAuthRepository.findOne.mockReturnValue(null);
    await expect(service.invoke(dto)).rejects.toThrow(UnauthorizedException);
    expect(mockAuthRepository.findOne).toHaveBeenCalledTimes(1);
  });

  it("should be return erro if user not found", async () => {
    const dto = MockAuth.mockAuthDto();
    const entity = MockAuth.mockAuthEntity();
    mockUserRepository.findOne.mockReturnValue(null);
    mockAuthRepository.findOne.mockReturnValue(entity);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    await expect(service.invoke(dto)).rejects.toThrow(NotFoundException);
    expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
  });

  it("should be return erro if user is removed", async () => {
    const dto = MockAuth.mockAuthDto();
    const entity = MockAuth.mockAuthEntity();
    const userEntity = MockUser.mockUserEntity();
    userEntity.status = "REMOVIDO";
    mockUserRepository.findOne.mockReturnValue(userEntity);
    mockAuthRepository.findOne.mockReturnValue(entity);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    await expect(service.invoke(dto)).rejects.toThrow(NotFoundException);
    expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
  });
});
