import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks.ts";
import {listFlowers, reset} from "../features/flower/flower.slice.ts";
import Spinner from "../components/Spinner.tsx";
import FlowerItem from "./FlowerItem.tsx";

function FlowerList() {
    const dispatch = useAppDispatch();
    const {
        flowers,
        isLoading,
    } = useAppSelector((state) => state.flower);

    useEffect(() => {
        dispatch(listFlowers(null));

        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    if (isLoading) {
        return <Spinner />;
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
                <div className="grid gap-4">
                    {flowers.map((flower) => (
                        <FlowerItem key={flower._id} flower={flower}/>
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
