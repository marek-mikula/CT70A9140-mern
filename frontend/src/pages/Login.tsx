import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks.ts";
import { login, reset } from "../features/auth/auth.slice.ts";
import Spinner from "../components/Spinner.tsx";

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const {
        user,
        isLoading,
        isError,
        isSuccess,
        message
    } = useAppSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            setError(message)
        }

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        dispatch(login({
            email: formData.email,
            password: formData.password,
        }))
    };

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4">
            <div className="w-full max-w-md bg-white/70 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl shadow-emerald-900/10 border border-emerald-100/50">

                {/* Brand Accent */}
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 bg-emerald-500 rounded-tr-lg rounded-bl-lg"></div>
                    </div>
                </div>

                <h2 className="text-3xl font-extrabold text-center text-emerald-950 mb-2 tracking-tight">
                    Welcome back
                </h2>
                <p className="text-center text-emerald-600/70 text-sm mb-10 font-medium">
                    Ready to tend to your garden?
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-emerald-700/50 ml-5">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            autoComplete="email"
                            required
                            placeholder="flower@growth.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-6 py-4 bg-emerald-50/50 border border-emerald-100/50 rounded-[1.5rem] text-emerald-900 placeholder:text-emerald-300 focus:ring-4 focus:ring-emerald-400/10 focus:bg-white transition-all outline-none"
                        />
                    </div>

                    {/* Password field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-emerald-700/50 ml-5">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            required
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-6 py-4 bg-emerald-50/50 border border-emerald-100/50 rounded-[1.5rem] text-emerald-900 placeholder:text-emerald-300 focus:ring-4 focus:ring-emerald-400/10 focus:bg-white transition-all outline-none"
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="px-5 py-3 bg-rose-50 rounded-2xl border border-rose-100 animate-in fade-in zoom-in-95 duration-200">
                            <p className="text-sm text-rose-500 font-semibold flex items-center gap-2">
                                <span className="w-1 h-1 bg-rose-400 rounded-full"></span>
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-4 mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-[1.5rem] transition-all active:scale-[0.97] shadow-lg shadow-emerald-200"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-emerald-700/60 font-medium">
                    New gardener? <Link to="/register" className="text-emerald-600 hover:underline cursor-pointer">Join the community</Link>
                </p>
            </div>
        </div>
    );
}

export default Login
