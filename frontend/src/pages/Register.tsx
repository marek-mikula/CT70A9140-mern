import {type ChangeEvent, type SubmitEvent, useEffect, useState} from "react";
import {useAppSelector, useAppDispatch} from "../app/hooks.ts";
import {useNavigate} from 'react-router-dom'
import {register, reset} from "../features/auth/auth.slice.ts";
import Spinner from "../components/Spinner.tsx";

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
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

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        setError('');

        dispatch(register({
            name: formData.name!,
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
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Full Name field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 ml-4">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            autoComplete="name"
                            required
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-6 py-3.5 bg-gray-50 border-none rounded-2xl text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-blue-400/50 transition-all outline-none"
                        />
                    </div>

                    {/* Email field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 ml-4">
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
                            className="w-full px-6 py-3.5 bg-gray-50 border-none rounded-2xl text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-blue-400/50 transition-all outline-none"
                        />
                    </div>

                    {/* Password fields row */}
                    <div className="grid grid-cols-1 gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 ml-4">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                autoComplete="new-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-6 py-3.5 bg-gray-50 border-none rounded-2xl text-gray-700 focus:ring-2 focus:ring-blue-400/50 transition-all outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 ml-4">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                autoComplete="off"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-6 py-3.5 bg-gray-50 border-none rounded-2xl text-gray-700 focus:ring-2 focus:ring-blue-400/50 transition-all outline-none"
                            />
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="px-4 py-3 bg-red-50 rounded-2xl border border-red-100 animate-in fade-in slide-in-from-top-1">
                            <p className="text-sm text-red-500 font-medium text-center">{error}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-4 mt-4 bg-gray-900 hover:bg-black text-white font-semibold rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-gray-200"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register
