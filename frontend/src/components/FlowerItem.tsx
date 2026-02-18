import type {Flower} from "../features/flower/flower.type.ts";
import {deleteFlower} from "../features/flower/flower.slice.ts";
import {useAppDispatch} from "../app/hooks.ts";

interface Props {
    flower: Flower
}

function FlowerItem({flower}: Props) {
    const dispatch = useAppDispatch()

    const handleDelete = (id: string) => {
        dispatch(deleteFlower(id))
    }

    return (
        <div className="group bg-white/70 backdrop-blur-md p-6 rounded-[2rem] border border-emerald-100/50 shadow-xl shadow-emerald-900/5 hover:shadow-emerald-900/10 hover:-translate-y-1 transition-all duration-300">
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
    );
}

export default FlowerItem;
