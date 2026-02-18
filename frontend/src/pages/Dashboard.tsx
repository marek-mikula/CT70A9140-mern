import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import FlowerForm from "../components/FlowerForm.tsx";
import FlowerList from "../components/FlowerList.tsx";

function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const {user} = useAppSelector(state => state.auth)

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate, dispatch]);

    return (
        <>
            <header className="my-8">
                <h1 className="text-xl tracking-tight font-semibold text-center">Welcome {user && user.name} to your garden!</h1>
            </header>
            <FlowerForm/>
            <FlowerList/>
        </>
    )
}

export default Dashboard
