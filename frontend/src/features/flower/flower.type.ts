export interface Flower {
    _id: string
    user: string
    name: string
    waterDuration: number
    lightLevel: 'low' | 'medium' | 'bright',
    soilType: 'standard' | 'cactus_succulent' | 'peat_moss' | 'orchid_bark',
    lastWateredAt: string | null
    createdAt: string
    updatedAt: string
}

export interface StoreFlowerData {
    name: string
    waterDuration: number
    lightLevel: string
    soilType: string
}
