export interface Flower {
    _id: string
    user: string
    name: string
    waterDuration: number
    lastWateredAt: string | null
    createdAt: string
    updatedAt: string
}

export interface StoreFlowerData {
    name: string
    waterDuration: number
}
