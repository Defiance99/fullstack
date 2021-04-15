export interface Product {
    id: string
    name: string
    price: string
    weight: number
    bonuses: string[]
    currency: string
    category: string[]
    chartDays: string[]
    description: string
    customFields: CustomFields[]
    images?: string[]
    previewImage: string
    user?: User
    quantity: number
}

export interface ProductOrder {
    id?: string
    products: ShortProductOrder
    quantity: number
}

export interface ShortProductOrder {
    id: string
    name: string
    price: string
}

export interface User {
    id?: string
    userName: string
    email?: string
    login?: string
    password?: string
}

export interface SignInForm {
    login: string
    password: string
}

export interface Review {
    theme: string
    message: string
    rating: number
    maxRating: number
    user: User
}

export interface CreateReview {
    theme: string
    message: string
    rating: number
}

export interface CustomFields {
    nameCustomField: string
    valueCustomField: string
}