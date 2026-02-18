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

        await this.handleErrors(response)

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

        await this.handleErrors(response, 201)

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

        await this.handleErrors(response)

        return id
    }

    public async water(id: string, token: string): Promise<Flower> {
        const response = await fetch(`/api/flowers/${id}/water`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })

        await this.handleErrors(response)

        return await response.json() as Flower
    }

    private async handleErrors(response: Response, expectedStatus: number = 200): Promise<void> {
        if (response.status === 400) {
            const data = await response.json() as { message: string }
            throw new Error(data.message)
        }

        if (response.status !== expectedStatus) {
            throw new Error('Request failed.')
        }
    }
}

const flowerService = new FlowerService()

export default flowerService
