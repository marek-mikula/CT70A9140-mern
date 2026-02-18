import type {Flower, StoreFlowerData} from "./flower.type.ts";

class FlowerService {
    public async list(token: string): Promise<Flower[]> {
        const response = await fetch('/api/flowers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })

        if (response.status !== 200) {
            throw new Error('Get flowers request failed.')
        }

        return await response.json() as Flower[]
    }

    public async store(data: StoreFlowerData, token: string): Promise<Flower> {
        const response = await fetch('/api/flowers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        })

        if (response.status === 400) {
            const data = await response.json() as { message: string }
            throw new Error(data.message)
        }

        if (response.status !== 200) {
            throw new Error('Store flower request failed.')
        }

        return await response.json() as Flower
    }

    public async delete(id: string, token: string): Promise<string> {
        const response = await fetch(`/api/flowers/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })

        if (response.status !== 200) {
            throw new Error('Delete flower request failed.')
        }

        return id
    }
}

const flowerService = new FlowerService()

export default flowerService
