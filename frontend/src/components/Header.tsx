import {Link, useNavigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {logout, reset} from "../features/auth/auth.slice.ts";

function Header() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }

    return (
        <header className={'py-2 px-4 flex items-center justify-between bg-gray-50 border border-gray-200 shadow-xs rounded-xl'}>
            <span className={'font-bold tracking-wide'}>
                Mern
            </span>
            <nav className={'flex items-center gap-2'}>
                {user === null ? (
                    <>
                        <Link to={'/login'} className={'hover:underline hover:text-indigo-600'}>Login</Link>
                        <Link to={'/register'} className={'hover:underline hover:text-indigo-600'}>Register</Link>
                    </>
                ) : (
                    <>
                        <Link to={'/'} className={'hover:underline hover:text-indigo-600'}>Dashboard</Link>
                        <button className={'hover:underline hover:text-indigo-600'} onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Header
