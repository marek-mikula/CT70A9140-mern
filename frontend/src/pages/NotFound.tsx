import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-[70vh] px-4">
            <div className="w-full max-w-md text-center p-10 bg-white/70 backdrop-blur-xl rounded-[3rem] shadow-2xl shadow-emerald-900/10 border border-emerald-100/50">

                {/* Visual Ornament */}
                <div className="relative mb-8">
                    <h1 className="text-[9rem] font-black text-emerald-500/10 leading-none tracking-tighter select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        {/* Wilted Leaf Icon */}
                        <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-2">
                            <div className="w-6 h-6 bg-emerald-300 rounded-tr-2xl rounded-bl-2xl rotate-[15deg] opacity-60"></div>
                        </div>
                        <span className="text-2xl font-extrabold text-emerald-950 tracking-tight">
                            Path Overgrown
                        </span>
                    </div>
                </div>

                <div className="space-y-3 mb-10">
                    <p className="text-emerald-800/60 text-lg font-medium leading-relaxed">
                        Oops! It looks like this part of the garden hasn't been planted yet.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <Link
                        to="/"
                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-[1.5rem] transition-all active:scale-[0.97] shadow-lg shadow-emerald-200"
                    >
                        Return to Garden
                    </Link>

                    <button
                        onClick={() => navigate(-1)}
                        className="w-full py-4 text-emerald-600 font-bold hover:text-emerald-800 transition-colors"
                    >
                        Go Back
                    </button>
                </div>

                {/* Decorative dots */}
                <div className="mt-8 flex justify-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-200 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-emerald-100 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-emerald-50 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
