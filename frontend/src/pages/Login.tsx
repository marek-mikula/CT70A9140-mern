import {type ChangeEvent, type SubmitEvent, useState} from "react";

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Add your API call logic here
    };

    return (
        <div className="mx-auto max-w-md p-8 space-y-6 bg-gray-50 border border-gray-200 shadow-xs rounded-xl">
            <h2 className="text-2xl font-bold text-center text-gray-800">Log in</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Email field */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                {/* Password field */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        autoComplete="new-password"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                {/* Error Message */}
                {error && <p className="text-sm text-red-500">{error}</p>}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 font-semibold text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login
