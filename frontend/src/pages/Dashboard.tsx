import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import GoalForm from "../components/GoalForm.tsx";
import {getGoals, reset} from "../features/goal/goal.slice.ts";
import Spinner from "../components/Spinner.tsx";
import GoalList from "../components/GoalList.tsx";

function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const {user} = useAppSelector(state => state.auth)
    const {
        goals,
        isLoading,
        // isError,
        // message
    } = useAppSelector(state => state.goal)

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }

        dispatch(getGoals(null))

        return () => {
            dispatch(reset())
        }
    }, [user, navigate]);

    return (
        <>
            <header className="my-8">
                <h1 className="text-xl tracking-tight font-semibold text-center">Welcome {user && user.name}</h1>
            </header>

            <GoalForm/>

            <section className="mt-8">
                {isLoading ? <Spinner/> : <GoalList goals={goals}/>}
            </section>
        </>
    )
}

export default Dashboard
