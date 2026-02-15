import {type ChangeEvent, type SubmitEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {login, reset} from "../features/auth/auth.slice.ts";
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
    }, [
        user,
        isError,
        isSuccess,
        message,
        navigate,
        dispatch,
    ])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError('');

        dispatch(login({
            email: formData.email!,
            password: formData.password!,
        }))
    };

    if (isLoading) {
        return (
            <Spinner/>
        )
    }

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100">

                <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 tracking-tight">
                    Welcome back
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Email field */}
                    <div className="flex flex-col gap-2">
                        <label
                            className="text-xs font-semibold uppercase tracking-wider text-gray-400 ml-4"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            autoComplete="email"
                            required
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-blue-400/50 transition-all outline-none"
                        />
                    </div>

                    {/* Password field */}
                    <div className="flex flex-col gap-2">
                        <label
                            className="text-xs font-semibold uppercase tracking-wider text-gray-400 ml-4"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-gray-700 focus:ring-2 focus:ring-blue-400/50 transition-all outline-none"
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="px-4 py-2 bg-red-50 rounded-xl border border-red-100">
                            <p className="text-sm text-red-500 font-medium">{error}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-4 mt-2 bg-gray-900 hover:bg-black text-white font-semibold rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-gray-200"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-400">
                    Don't have an account? <span className="text-gray-900 font-medium cursor-pointer hover:underline">Sign up</span>
                </p>
            </div>
        </div>
    );
}

export default Login
