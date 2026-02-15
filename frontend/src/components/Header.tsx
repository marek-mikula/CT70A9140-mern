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
        <header className="mx-auto max-w-5xl mt-6 px-6 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md border border-gray-100 shadow-xl shadow-gray-200/40 rounded-[2rem]">
            {/* Logo / Title */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="font-bold tracking-tight text-gray-900 text-lg ml-1">Goals <span className="text-gray-400 font-medium">App</span></span>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-1">
                {user === null ? (
                    <>
                        <Link
                            to="/login"
                            className="px-5 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="px-5 py-2 text-sm font-medium bg-gray-900 text-white rounded-2xl hover:bg-black transition-all active:scale-[0.95]"
                        >
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            to="/"
                            className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Dashboard
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="px-5 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                        >
                            Logout
                        </button>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header
