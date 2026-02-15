import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from "./pages/Dashboard.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import Header from './components/Header.tsx'

function App() {
    return (
        <>
            <Router>
                <div className={'max-w-xl mx-auto p-2'}>
                    <Header/>
                    <main className={'mt-4'}>
                        <Routes>
                            <Route path={'/'} element={<Dashboard/>}/>
                            <Route path={'/register'} element={<Register/>}/>
                            <Route path={'/login'} element={<Login/>}/>
                        </Routes>
                    </main>
                </div>
            </Router>
        </>
    )
}

export default App
