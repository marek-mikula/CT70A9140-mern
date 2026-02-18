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

export const lightLevels = {
    low: "Low Light",
    medium: "Medium Light (indirect)",
    bright: "Bright Light"
}

export const soilTypes = {
    standard: "Standard Soil",
    cactus_succulent: "Cactus/Succulent",
    peat_moss: "Peat Moss",
    orchid_bark: "Orchid Bark"
}
