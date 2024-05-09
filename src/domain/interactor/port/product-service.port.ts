import { Injectable } from "@nestjs/common";
import { Product } from "src/domain/entity/product/product.entity";

export interface ProductServicePort {
    findAll(): Promise<Product[]> 
}

export const ProductServicePort = Symbol('ProductServicePort')