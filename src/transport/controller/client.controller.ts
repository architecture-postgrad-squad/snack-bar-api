import { BadRequestException } from '@/core/exceptions/custom-exceptions/bad-request.exception';
import { InternalServerErrorException } from '@/core/exceptions/custom-exceptions/internal-server-error.exception';
import { NotFoundException } from '@/core/exceptions/custom-exceptions/not-found.exception';
import { Client } from '@/core/domain/client/client.entity';
import { ClientReaderServicePort } from '@/core/interactor/port/client/client-reader-service.port';
import { ClientWriterServicePort } from '@/core/interactor/port/client/client-writer-service.port';
import { API_RESPONSE } from '@/transport/constant/api-response.constant';
import { CLIENT } from '@/transport/constant/client.constant';
import { CreateClientDto, toDomain } from '@/transport/dto/client/create-client.dto';
import { UpdateClientDto, toDomain as updateToDomain } from '@/transport/dto/client/update-client.dto';
import { Body, Controller, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

const { CREATE, GET_ALL, GET_BY_ID, GET_BY_CPF, UPDATE } = CLIENT.API_PROPERTY;
const {
  OK_DESC,
  CREATED_DESC,
  BAD_REQUEST_DESC,
  NOT_FOUND_DESC,
  INTERNAL_SERVER_EXCEPTION_DESC,
} = API_RESPONSE;

@Controller('clients')
@ApiTags('clients')
export class ClientController {
  constructor(
    private readonly clientWriterService: ClientWriterServicePort,
    private readonly clientReaderService: ClientReaderServicePort,
  ) {}

  @Post()
  @ApiOperation({ summary: CREATE.SUMMARY, description: CREATE.DESC })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CREATED_DESC,
    type: () => Client,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: BAD_REQUEST_DESC,
    type: () => BadRequestException,
  })
  async create(@Body() createClient: CreateClientDto) {
    return this.clientWriterService.create(toDomain(createClient));
  }

  @Get()
  @ApiOperation({ summary: GET_ALL.SUMMARY, description: GET_ALL.DESC })
  @ApiResponse({
    status: HttpStatus.OK,
    description: OK_DESC,
    type: () => Client,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: INTERNAL_SERVER_EXCEPTION_DESC,
    type: () => InternalServerErrorException,
  })
  async findAll() {
    return this.clientReaderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: GET_BY_ID.SUMMARY, description: GET_BY_ID.DESC })
  @ApiResponse({
    status: HttpStatus.OK,
    description: OK_DESC,
    type: () => Client,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: NOT_FOUND_DESC,
    type: () => NotFoundException,
  })
  async findById(@Param('id') id: string) {
    return this.clientReaderService.findById(id);
  }

  @Get('cpf/:cpf')
  @ApiOperation({ summary: GET_BY_CPF.SUMMARY, description: GET_BY_CPF.DESC })
  @ApiResponse({
    status: HttpStatus.OK,
    description: OK_DESC,
    type: () => Client,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: NOT_FOUND_DESC,
    type: () => NotFoundException,
  })
  async findByCpf(@Param('cpf') cpf: string) {
    return this.clientReaderService.findByCpf(cpf);
  }

  @Patch(':id')
  @ApiOperation({ summary: UPDATE.SUMMARY, description: UPDATE.DESC })
  @ApiResponse({ status: HttpStatus.OK, description: OK_DESC, type: () => Client })
  async update(@Body() editClient: UpdateClientDto, @Param('id') id: string) {
    return this.clientWriterService.update(updateToDomain(editClient, id));
  }
}
