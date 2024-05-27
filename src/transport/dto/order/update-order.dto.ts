import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";

import { StatusEnum } from "@/core/domain/order/status.entity";
import { ORDER } from "@/transport/constant/order.constant";

const { STATUS } = ORDER.API_PROPERTY.ORDER;

export class UpdateOrderDTO {
    @IsEnum(['RECEIVED','IN_PROGRESS', 'DONE', 'FINISHED'])
    @ApiProperty({ example: STATUS.EXAMPLE, description: STATUS.DESC })
    readonly status: StatusEnum;
}