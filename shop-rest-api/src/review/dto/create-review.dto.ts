export class CreateReviewDto {
    readonly id: number
    readonly theme: string
    readonly name: string
    readonly email: string
    readonly comment: string
    readonly rating: number
}