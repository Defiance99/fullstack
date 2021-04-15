export class ProductOrderDto {
    id: number
    quantity: number
    orderDetails: OrderDetails
}

class OrderDetails {
    id: number
    name: string
    price: string
}