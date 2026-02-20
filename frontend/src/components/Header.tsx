import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "../app/hooks.ts";
import { logout, reset } from "../features/auth/auth.slice.ts";

function Header() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }

    return (
        <header className="mx-auto max-w-5xl mt-6 px-6 py-4 flex items-center justify-between bg-emerald-50/60 backdrop-blur-lg border border-emerald-100/50 shadow-lg shadow-emerald-900/5 rounded-[2rem]">
            {/* Logo / Title */}
            <div className="flex items-center gap-2">
                {/* Custom Leaf Icon */}
                <div className="w-9 h-9 bg-emerald-500 rounded-tr-[14px] rounded-bl-[14px] rounded-tl-md rounded-br-md flex items-center justify-center shadow-inner">
                    <div className="w-1.5 h-4 bg-emerald-100/90 rotate-45 rounded-full"></div>
                </div>
                <span className="font-extrabold tracking-tight text-emerald-950 text-xl ml-1">
                    Flowee<span className="text-emerald-500">.</span>
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-2">
                {user === null ? (
                    <>
                        <Link
                            to="/login"
                            className="px-5 py-2 text-sm font-semibold text-emerald-800 hover:text-emerald-600 transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="px-6 py-2 text-sm font-bold bg-emerald-600 text-white rounded-[1.5rem] hover:bg-emerald-700 hover:shadow-md hover:shadow-emerald-200 transition-all active:scale-[0.95]"
                        >
                            Get Started
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            to="/"
                            className="px-5 py-2 text-sm font-semibold text-emerald-800 hover:text-emerald-600 transition-colors"
                        >
                            My Garden
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="px-5 py-2 text-sm font-semibold text-rose-500 hover:bg-rose-50 rounded-full transition-all"
                        >
                            Logout
                        </button>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Header
