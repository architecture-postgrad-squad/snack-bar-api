import { CategoryEnum } from "./category.entity"

export class Product {
    readonly id: number
    readonly name: string
    readonly category: CategoryEnum
    readonly price: number
    readonly description?: string
    readonly images?: string[]
}