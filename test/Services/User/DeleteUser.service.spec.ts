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
import { NotFoundException } from "@nestjs/common";

MockEnv.mock();

describe("DeleteUserService", () => {
  let service: DeleteUserService;
  let mockUserRepository = MockRepository.mockRepository();

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
      ],
    }).compile();

    service = module.get<DeleteUserService>(DeleteUserService);
  });

  beforeEach(() => {
    mockUserRepository = MockRepository.resetMocks(mockUserRepository);
  });

  it("should Be defined", () => {
    expect(service).toBeDefined();
  });

  it("should be delete user", async () => {
    const dto = MockUser.mockDeleteUserDto();
    const entity = MockUser.mockUserEntity();
    mockUserRepository.findOne.mockReturnValue(entity);
    mockUserRepository.update.mockReturnValue(entity);
    await service.invoke(dto);
    expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.update).toHaveBeenCalledTimes(1);
  });

  it("should be return error if user not found", async () => {
    const dto = MockUser.mockUserDto();
    mockUserRepository.findOne.mockReturnValue(null);
    await expect(service.invoke(dto)).rejects.toThrow(NotFoundException);
    expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
  });

  it("should be return error if user not found if status is removed", async () => {
    const dto = MockUser.mockUserDto();
    const entity = MockUser.mockUserEntity();
    entity.status = "REMOVIDO";
    mockUserRepository.findOne.mockReturnValue(entity);
    await expect(service.invoke(dto)).rejects.toThrow(NotFoundException);
    expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
  });
});
