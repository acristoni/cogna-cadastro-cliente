import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { EstadoCivil } from './enums/estadocivil.enum';

@ApiTags('Cliente')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @ApiOperation({
    summary: 'Cria um novo cliente no sistema',
  })
  async create(@Body() createClientDto: CreateClientDto) {
    return await this.clientService.create(createClientDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Tráz todos os clientes do banco de dados com paginação',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'Número da página, começando por 1 e default 1',
    example: 1,
    required: false,
  })
  @ApiQuery({
    name: 'pageSize',
    type: Number,
    description: 'Tamanho da página, default 10',
    example: 10,
    required: false,
  })
  async findAll(@Query('page') page, @Query('pageSize') pageSize) {
    return await this.clientService.findAll(page, pageSize);
  }

  @Get('filtrar')
  @ApiOperation({
    summary: 'Tráz todos os clientes filtrados pelas queries enviadas',
  })
  @ApiQuery({
    name: 'nome',
    type: String,
    description: 'Nome dos clientes',
    example: 'Valdecir',
    required: false,
  })
  @ApiQuery({
    name: 'datanasciemnto',
    type: Date,
    description: 'Data de nascimento',
    example: '1990-01-01',
    required: false,
  })
  @ApiQuery({
    name: 'cpf',
    type: String,
    description:
      'CPF do cliente, SE A QUERY CPF FOR ENVIADA O END POINT RETORNARÁ APENAS UM CLIENTE DO CONTRÁRIO RETORNARÁ UM ARRAY',
    example: '49317131069',
    required: false,
  })
  @ApiQuery({
    name: 'estadocivil',
    type: String,
    description:
      'Estado civil dos clientes, que podem ser: casado, solteiro, divorciado, viuvo',
    example: 'solteiro',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'Número da página, começando por 1 e default 1',
    example: 1,
    required: false,
  })
  @ApiQuery({
    name: 'pageSize',
    type: Number,
    description: 'Tamanho da página, default 10',
    example: 10,
    required: false,
  })
  async findMany(
    @Query('nome') nome: string,
    @Query('datanasciemnto') dataNasciemnto: string,
    @Query('cpf') cpf: string,
    @Query('estadocivil') estadoCivil: EstadoCivil,
    @Query('page') page,
    @Query('pageSize') pageSize,
  ) {
    if (cpf && cpf.length === 11) {
      return await this.clientService.findByCpf(cpf);
    } else {
      return await this.clientService.findMany(
        nome,
        dataNasciemnto,
        estadoCivil,
        page,
        pageSize,
      );
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualiza os dados de um cliente especificado pelo seu id',
  })
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return await this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Exclui os dados de um cliente especificado pelo seu id',
  })
  async remove(@Param('id') id: string) {
    return await this.clientService.remove(id);
  }
}
