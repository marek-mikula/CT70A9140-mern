import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks.ts";
import {deleteFlower, listFlowers, reset} from "../features/flower/flower.slice.ts";
import Spinner from "../components/Spinner.tsx";

function FlowerList() {
    const dispatch = useAppDispatch();
    const { flowers, isLoading } = useAppSelector(
        (state) => state.flower
    );

    useEffect(() => {
        dispatch(listFlowers(null));

        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    if (isLoading) {
        return <Spinner />;
    }

    const handleDelete = (id: string) => {
        dispatch(deleteFlower(id))
    }

    return (
        <section className="mx-auto max-w-5xl mt-12 px-4">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-extrabold text-emerald-950">My Garden</h2>
                    <p className="text-emerald-600/60 font-medium">You have {flowers.length} plants to tend to.</p>
                </div>

                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Garden Lush</span>
                </div>
            </div>

            {flowers.length > 0 ? (
                <div className="grid gap-6">
                    {flowers.map((flower) => (
                        <div
                            key={flower._id}
                            className="group bg-white/70 backdrop-blur-md p-6 rounded-[2rem] border border-emerald-100/50 shadow-xl shadow-emerald-900/5 hover:shadow-emerald-900/10 hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                    {/* Flower/Plant Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </div>
                                <button className="text-rose-300 hover:text-rose-500 p-2 transition-colors" onClick={() => handleDelete(flower._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>

                            <h3 className="text-xl font-bold text-emerald-950 mb-1">{flower.name}</h3>

                            <div className="flex items-center gap-2 mt-4">
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                                    </svg>
                                    <span className="text-xs font-bold uppercase tracking-tight">Every {flower.waterDuration} Days</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-emerald-50/30 rounded-[3rem] border-2 border-dashed border-emerald-100">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-emerald-900">No flowers found</h3>
                    <p className="text-emerald-600/60">Plant your first seed using the form above!</p>
                </div>
            )}
        </section>
    );
}

export default FlowerList;
