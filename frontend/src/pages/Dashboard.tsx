import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../app/hooks.ts";
import GoalForm from "../components/GoalForm.tsx";

function Dashboard() {
    const navigate = useNavigate()

    const {user} = useAppSelector(state => state.auth)

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate]);

    return (
        <>
            <header className="my-8">
                <h1 className="text-xl tracking-tight font-semibold text-center">Welcome {user && user.name}</h1>
            </header>

            <GoalForm/>
        </>
    )
}

export default Dashboard
