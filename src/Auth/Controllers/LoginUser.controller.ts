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
import { LoginRequest } from "../Request/Login.request";
import { LoginUserService } from "../Services/LoginUser.service";
import { LoginUserTransformer } from "../Tranformers/LoginUser.tranformer";
import { AuthUserResponse } from "../Response/AuthUser.response";

@Controller("auth")
@ApiTags("Auth")
export class LoginUserController {
  private readonly logger = new Logger(LoginUserController.name);
  constructor(
    private readonly transformer: LoginUserTransformer,
    private readonly service: LoginUserService
  ) {}

  @Post("/login")
  @ApiBody({
    description: "Login Payload.",
    type: LoginRequest,
  })
  @ApiOperation({ summary: "User Login" })
  @ApiResponse({
    description: "Return User Data",
    type: AuthUserResponse,
    status: HttpStatus.OK,
  })
  async handle(
    @Body() body: LoginRequest,
    @Req() req,
    @Res() res: Response
  ): Promise<Response> {
    try {
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
            status: HttpStatus.OK,
            data: response,
          },
        })
      );
      return res.status(HttpStatus.OK).send(response);
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
