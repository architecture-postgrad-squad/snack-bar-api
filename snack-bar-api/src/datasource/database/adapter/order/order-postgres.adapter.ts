import { PrismaService } from '@/config/prisma.config';
import { OrderProduct } from '@/core/domain/order/order-product.entity';
import { Order } from '@/core/domain/order/order.entity';
import { StatusEnum } from '@/core/domain/order/status.entity';

import { IOrderRepository } from '@/core/repository/order/order.respository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderPostgresAdapter implements IOrderRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(order: Order, productsIds: string[]): Promise<Order> {
    const createdOrder = await this.prisma.order.create({
      data: {
        clientId: order.clientId,
      },
    });

    await this.prisma.orderProduct.createMany({
      data: productsIds.map((productId) => ({
        orderId: createdOrder.id,
        productId,
      })),
    });

    return createdOrder as Order;
  }
  async update(order: Order): Promise<Order> {
    const updatedOrder = await this.prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        ...order,
        status: order.status,
      },
    });

    return updatedOrder as Order;
  }

  async findOrderById(id: string): Promise<Order> {
    const orders = await this.prisma.order.findUnique({
      where: {
        id,
      },
    });
    return orders as Order;
  }

  async findOrderByPayment(id: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: {
        paymentId: id,
      },
    });
    return order as Order;
  }

  async findOrderProductById(id: string): Promise<OrderProduct> {
    const orders = await this.prisma.order
      .findUnique({
        select: {
          id: true,
          client: true,
          payment: true,
          orderCode: true,
          status: true,
          createdAt: true,
          products: {
            select: {
              product: true,
            },
          },
        },
        where: {
          id,
        },
      })
      .then((order) => {
        return { ...order, products: order.products.map((product) => product.product) };
      });

    return orders as OrderProduct;
  }

  async findAllOrderProduct(): Promise<OrderProduct[]> {
    const orders = await this.prisma.order
      .findMany({
        where: {
          status: {
            in: [StatusEnum.DONE, StatusEnum.IN_PROGRESS, StatusEnum.RECEIVED],
          },
        },
        select: {
          id: true,
          client: true,
          payment: true,
          orderCode: true,
          status: true,
          createdAt: true,
          products: {
            select: {
              product: true,
            },
          },
        },
      })
      .then((orders) => {
        return orders.map((order) => {
          return { ...order, products: order.products.map((product) => product.product) };
        });
      });
    return orders as OrderProduct[];
  }
}
