import { ClientServicePort } from "@/domain/interactor/port/client-service.port";
import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SaveClientDTO } from "../dto/save-client.dto";
import { Client } from "@/domain/entity/client/client.entity";

@Controller('clients')
@ApiTags('clients')
export class ClientController {
    constructor(
        @Inject(ClientServicePort)
        private readonly clientService: ClientServicePort
    ) {}

    @Get()
    @ApiOperation({ summary: 'Get all clients' })
    @ApiResponse({ status: HttpStatus.OK, description: 'All clients list', type: Client })
    async findAll() {
        return this.clientService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get client by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The client with requested ID', type: Client })
    async findById(@Param() params: any) {
        return this.clientService.findById(params.id)
    }

    @Post()
    @ApiOperation({ summary: 'Create client' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The created client', type: Client })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createClient: SaveClientDTO) {
        return this.clientService.create({
            ...createClient,
            id: null
        })
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update client' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The updated client', type: Client })
    async update(@Body() editClient: SaveClientDTO, @Param() params: any) {
        return this.clientService.update({
            ...editClient,
            id: params.id
        })
    }
}