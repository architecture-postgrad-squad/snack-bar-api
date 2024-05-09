import { Category } from "./category.entity"

export class Product {
    readonly id: number
    readonly name: string
    readonly category: Category
    readonly price: number
    readonly description?: string
    readonly images?: string[]
}