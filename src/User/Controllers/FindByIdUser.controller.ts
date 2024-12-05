import {
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Response } from "express";
import { FindByIdUserTransformer } from "../Transformers/FindByIdUser.transformer";
import { FindByIdUserService } from "../Services/FindByIdUser.service";
import { UserResponse } from "../Response/User.response";
import { JwtAuthGuard } from "src/Api/Security/Guard/JWT.guard";
import { UserGuard } from "src/Api/Security/Guard/User.guard";

@Controller("users")
@ApiBearerAuth()
@ApiTags("Users")
export class FindByIdUserController {
  private readonly logger = new Logger(FindByIdUserController.name);
  constructor(
    private readonly transformer: FindByIdUserTransformer,
    private readonly service: FindByIdUserService
  ) {}

  @Get("/:id")
  @UseGuards(JwtAuthGuard, UserGuard)
  @ApiParam({
    name: "id",
    description: "User Id",
  })
  @ApiOperation({ summary: "Find By Id User" })
  @ApiResponse({
    description: "Return User Data",
    type: UserResponse,
    status: HttpStatus.OK,
  })
  async handle(
    @Param("id") id: string,
    @Req() req,
    @Res() res: Response
  ): Promise<Response> {
    try {
      this.logger.debug("findById");
      let dto = await this.transformer.fromApi(id);
      dto = await this.service.invoke(dto);
      const response: UserResponse = await this.transformer.toApi(dto);
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
