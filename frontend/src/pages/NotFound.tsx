import {Link, useNavigate} from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="text-center space-y-8">
            <div className="relative">
                <h1 className="text-[8rem] font-bold text-gray-900 leading-none tracking-tighter opacity-5">
                    404
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-semibold text-gray-900 tracking-tight">
                          Page not found
                        </span>
                </div>
            </div>

            <div className="space-y-3">
                <p className="text-gray-400 text-lg">
                    Oops. Request page was not found.
                </p>
            </div>

            <div className="flex flex-col gap-3 pt-4">
                <Link
                    to="/"
                    className="w-full py-4 bg-gray-900 hover:bg-black text-white font-semibold rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-gray-200"
                >
                    Go back home
                </Link>

                <button
                    onClick={() => navigate(-1)}
                    className="w-full py-4 text-gray-500 font-medium hover:text-gray-900 transition-colors"
                >
                    Go back
                </button>
            </div>
        </div>
    );
};

export default NotFound;
