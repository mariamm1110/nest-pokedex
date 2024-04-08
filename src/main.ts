import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(
    new ValidationPipe({
      //conf para que no manden propiedades que no son
      whitelist:true,
      forbidNonWhitelisted: true,
    })
  )

  //le antepone esta palabra
  app.setGlobalPrefix('api/v2')

  await app.listen(3000);
}
bootstrap();
