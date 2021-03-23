export interface Product {
    name: string
    cost: number
    weight: number
    bonuses: string[]
    currency: string
    weightUnit: string
    category: string[]
    chartDays: string[]
    description: string
    customFields: string[]
}

export interface User {
    userName: string
    email: string
    login: string
    password: string
}

export interface SignInForm {
    login: string
    password: string
}