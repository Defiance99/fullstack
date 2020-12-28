export class CreateProductDto {
    readonly name: string
    readonly cost: number
    readonly weight: number
    readonly bonuses: string[]
    readonly currency: string
    readonly weightUnit: string
    readonly category: string[]
    readonly chartDays: string[]
}