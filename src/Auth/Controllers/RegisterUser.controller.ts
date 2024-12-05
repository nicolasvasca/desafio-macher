import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { RegisterUserService } from "../Storage/RegisterUser.service";
import { RegisterUserRequest } from "../Request/RegisterUser.request";
import { AuthUserResponse } from "../Response/AuthUser.response";
import { RegisterUserTransformer } from "../tranformer/RegisterUser.tranformer";

@Controller("auth")
@ApiTags("Auth")
export class RegisterUserController {
  private readonly logger = new Logger(RegisterUserController.name);
  constructor(
    private readonly transformer: RegisterUserTransformer,
    private readonly service: RegisterUserService
  ) {}

  @Post("/signup")
  @ApiBody({
    description: "Payload containing the credentials for register.",
    type: RegisterUserRequest,
  })
  @ApiOperation({ summary: "Register User" })
  @ApiResponse({
    description: "Return User Data",
    type: AuthUserResponse,
    status: HttpStatus.CREATED,
  })
  async handle(
    @Body() body: RegisterUserRequest,
    @Req() req,
    @Res() res: Response
  ): Promise<Response> {
    try {
      this.logger.debug("registerUser");
      let dto = await this.transformer.fromApi(body);
      dto = await this.service.invoke(dto);
      const response: AuthUserResponse = await this.transformer.toApi(dto);
      this.logger.debug(
        JSON.stringify({
          req: {
            body: { ...req.body, password: "" },
            query: req.query,
            params: req.params,
          },
          res: {
            status: HttpStatus.CREATED,
            data: response,
          },
        })
      );
      return res.status(HttpStatus.CREATED).send(response);
    } catch (error) {
      this.logger.error(
        JSON.stringify({
          req: {
            body: { ...req.body, password: "" },
            query: req.query,
            params: req.params,
          },
          res: {},
          error: error,
        })
      );
      throw error;
    }
  }
}
