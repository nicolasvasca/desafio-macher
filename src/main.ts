import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, NestApplicationOptions, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as dotenv from "dotenv";

function setupSwaggerDocs(app: NestExpressApplication) {
  const docConfig = new DocumentBuilder()
    .setTitle("Desafio API")
    .setDescription("API referencias do Desafio")
    .setVersion(process.env.API_VERSION)
    .addBearerAuth()
    .addServer(process.env.API_URL)
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, docConfig);

  SwaggerModule.setup("/", app, swaggerDoc, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: "Desafio Docs",
  });

  Logger.log("Mapped {/, GET} Swagger API route", "RouterExplorer");
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: true,
    cors: true,
  } as unknown as NestApplicationOptions);
  setupSwaggerDocs(app);
  dotenv.config();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();
