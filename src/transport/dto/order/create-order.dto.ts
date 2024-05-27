import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";

import { CLIENT } from "@/transport/constant/client.constant";
import { PRODUCT } from "@/transport/constant/product.constant";
import { Order } from "@/core/domain/order/order.entity";

const { ID: CLIENT_ID } = CLIENT.API_PROPERTY.CLIENT;
const { ID: PRODUCT_ID} = PRODUCT;

export class CreateOrderDTO {
    @IsOptional()
    @IsString()
    @IsOptional()
    @ApiProperty({ example: CLIENT_ID.EXAMPLE, description: CLIENT_ID.DESC })
    readonly clientId?: string;

    @IsArray()
    @IsString({ each: true })
    @ApiProperty({ example: [PRODUCT_ID.EXAMPLE], description: PRODUCT_ID.DESC })
    readonly products: string[];
}

export const toDomain = (dto: CreateOrderDTO): Order => {
    return new Order(
        null,
        dto.clientId
    );
};