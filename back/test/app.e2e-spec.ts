import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ClientModule } from '../src/client/client.module';
import mockClienteDto from '../src/utils/mocks/clientDto.mock';

let app: INestApplication;
let idClienteTeste: string;

beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule, ClientModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

describe('AppController (e2e)', () => {
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('API funcionando corretamente!');
  });
});

describe('ClientController (e2e)', () => {
  it('/cliente (GET)', async () => {
    return await request(app.getHttpServer()).get('/cliente').expect(200);
  });

  it('/cliente (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/cliente')
      .send(mockClienteDto);

    expect(response.status).toBe(201);
    expect(response.body.mensagem).toEqual('Cliente criado com sucesso');
    idClienteTeste = response.body.id;

    return response;
  });

  it('/cliente/filtrar?nome=Valdecir&datanasciemnto=1990-01-01&cpf=81587325004&estadocivil=solteiro&pageSize=10&page=1 (GET)', async () => {
    return await request(app.getHttpServer())
      .get(
        '/cliente/filtrar?nome=Valdecir&datanasciemnto=1990-01-01&cpf=81587325004&estadocivil=solteiro&pageSize=10&page=1',
      )
      .expect(200);
  });

  it('/cliente/:idCliente (PATCH)', async () => {
    return await request(app.getHttpServer())
      .patch(`/cliente/${idClienteTeste}`)
      .send(mockClienteDto)
      .expect(200);
  });

  it('/cliente/:idCliente (DELETE)', async () => {
    return await request(app.getHttpServer())
      .delete(`/cliente/${idClienteTeste}`)
      .send(mockClienteDto)
      .expect(200);
  });
});
