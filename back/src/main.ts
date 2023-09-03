import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API-Cadastro de clientes grupo Cogna')
    .setDescription(
      'Essa é a documentação da API para cadastro de clientes do grupo Cogna, é apenas um projeto desafio utilizado para demonstrar minhas habilidades como desenvolvedor fullstack, espero que apreciem o resultado, estou a disposição, obrigado pela oportunidade!',
    )
    .setVersion('1.0')
    .addTag('Cliente')
    .addTag('Raiz')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT || 3003;
  await app.listen(PORT);
}
bootstrap();
