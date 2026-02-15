import type {Goal, StoreGoalData, UpdateGoalData} from "./goal.type.ts";

class GoalService {
    public async getGoals(): Promise<Goal[]> {
        const response = await fetch('/api/goals', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.status !== 200) {
            throw new Error('Get goals request failed.')
        }

        return await response.json() as Goal[]
    }

    public async getGoal(id: string): Promise<Goal> {
        const response = await fetch(`/api/goals/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.status !== 200) {
            throw new Error('Get goal request failed.')
        }

        return await response.json() as Goal
    }

    public async store(data: StoreGoalData, token: string): Promise<Goal> {
        const response = await fetch('/api/goals', {
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
            throw new Error('Store goal request failed.')
        }

        return await response.json() as Goal
    }

    public async update(id: string, data: UpdateGoalData): Promise<Goal> {
        const response = await fetch(`/api/goals/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        if (response.status === 400) {
            const data = await response.json() as { message: string }
            throw new Error(data.message)
        }

        if (response.status !== 200) {
            throw new Error('Update goal request failed.')
        }

        return await response.json() as Goal
    }

    public async deleteGoal(id: string): Promise<void> {
        const response = await fetch(`/api/goals/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.status !== 200) {
            throw new Error('Delete goal request failed.')
        }
    }
}

const goalService = new GoalService()

export default goalService
