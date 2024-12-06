import {
  Controller,
  Get,
  HttpStatus,
  Logger,
  Query,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Response } from "express";
import { UserResponse } from "../Response/User.response";
import { JwtAuthGuard } from "../../Api/Security/Guard/JWT.guard";
import { UserGuard } from "../../Api/Security/Guard/User.guard";
import { FindUserService } from "../Services/FindUser.service";
import { FindUserTransformer } from "../Transformers/FindUser.transformer";
import { FindUserRequest } from "../Request/FindUser.request";

@Controller("users")
@ApiBearerAuth()
@ApiTags("Users")
export class FindUserController {
  private readonly logger = new Logger(FindUserController.name);
  constructor(
    private readonly transformer: FindUserTransformer,
    private readonly service: FindUserService
  ) {}

  @Get("")
  @UseGuards(JwtAuthGuard, UserGuard)
  @ApiOperation({ summary: "FindUser" })
  @ApiResponse({
    description: "Return User Data",
    type: [UserResponse],
    status: HttpStatus.OK,
  })
  async handle(
    @Query() query: FindUserRequest,
    @Req() req,
    @Res() res: Response
  ): Promise<Response> {
    try {
      this.logger.debug("find");
      const dto = await this.transformer.fromApi(query);
      const userDto = await this.service.invoke(dto);
      const response: UserResponse[] = await this.transformer.toApi(userDto);
      this.logger.debug(
        JSON.stringify({
          req: {
            body: req.body,
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
            body: req.body,
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
