import {Link} from 'react-router-dom'

function Header() {
    return (
        <header className={'py-2 px-4 flex items-center justify-between bg-gray-50 border border-gray-200 shadow-xs rounded-xl'}>
            <span className={'font-bold tracking-wide'}>
                Mern
            </span>
            <nav className={'flex items-center gap-2'}>
                <Link to={'/'} className={'hover:underline hover:text-indigo-600'}>Dashboard</Link>
                <Link to={'/login'} className={'hover:underline hover:text-indigo-600'}>Login</Link>
                <Link to={'/register'} className={'hover:underline hover:text-indigo-600'}>Register</Link>
            </nav>
        </header>
    )
}

export default Header
