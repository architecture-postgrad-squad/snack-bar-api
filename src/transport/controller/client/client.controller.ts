import { ClientWriterServicePort } from "@/domain/interactor/port/client/client-writer-service.port";
import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Client } from "@/domain/entity/client/client.entity";
import { SaveClientDTO } from "@/transport/dto/save-client.dto";
import { ClientReaderServicePort } from "@/domain/interactor/port/client/client-reader-service.port";

@Controller('clients')
@ApiTags('clients')
export class ClientController {
    constructor(
        private readonly clientWriterService: ClientWriterServicePort,
        private readonly clientReaderService: ClientReaderServicePort
    ) {}

    @Get()
    @ApiOperation({ summary: 'Get all clients' })
    @ApiResponse({ status: HttpStatus.OK, description: 'All clients list', type: Client })
    async findAll() {
        return this.clientReaderService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get client by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The client with requested ID', type: Client })
    async findById(@Param('id') id: string) {
        return this.clientReaderService.findById(id)
    }

    @Post()
    @ApiOperation({ summary: 'Create client' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The created client', type: Client })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createClient: SaveClientDTO) {
        return this.clientWriterService.create({
            ...createClient,
            id: null
        })
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update client' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The updated client', type: Client })
    async update(@Body() editClient: SaveClientDTO, @Param('id') id: string) {
        return this.clientWriterService.update({
            ...editClient,
            id: id
        })
    }
}