import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks.ts";
import FlowerForm from "../components/FlowerForm.tsx";
import FlowerList from "../components/FlowerList.tsx";
import WeatherStats from "../components/WeatherStats.tsx";

function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(state => state.auth)

    useEffect(() => {
        if (!user) navigate('/login')
    }, [user, navigate, dispatch]);

    return (
        <main className="pb-20">
            <header className="py-12 text-center">
                <h1 className="text-2xl md:text-3xl font-black text-emerald-950">
                    Hello, <span className="text-emerald-500">{user?.name}</span>! 🌿
                </h1>
            </header>

            <div className="space-y-8">
                <WeatherStats/>
                <FlowerForm />
                <FlowerList />
            </div>
        </main>
    )
}

export default Dashboard
