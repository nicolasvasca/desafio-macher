import {
  Controller,
  Delete,
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
import { JwtAuthGuard } from "../../Api/Security/Guard/JWT.guard";
import { UserAdmGuard } from "../../Api/Security/Guard/UserAdm.guard";
import { DeleteUserTransformer } from "../Transformers/DeleteUser.transformer";
import { DeleteUserService } from "../Services/DeleteUser.service";

@Controller("users")
@ApiBearerAuth()
@ApiTags("Users")
export class DeleteUserController {
  private readonly logger = new Logger(DeleteUserController.name);
  constructor(
    private readonly transformer: DeleteUserTransformer,
    private readonly service: DeleteUserService
  ) {}

  @Delete("/:id")
  @UseGuards(JwtAuthGuard, UserAdmGuard)
  @ApiParam({
    name: "id",
    description: "User Id",
  })
  @ApiOperation({ summary: "Delete User" })
  @ApiResponse({
    description: "No Content",
    status: HttpStatus.NO_CONTENT,
  })
  async handle(
    @Param("id") id: string,
    @Req() req,
    @Res() res: Response
  ): Promise<Response> {
    try {
      this.logger.debug("delete");
      const dto = await this.transformer.fromApi(id);
      await this.service.invoke(dto);
      this.logger.debug(
        JSON.stringify({
          req: {
            body: req.body,
            query: req.query,
            params: req.params,
          },
          res: {
            status: HttpStatus.NO_CONTENT,
          },
        })
      );
      return res.status(HttpStatus.NO_CONTENT).send();
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
