import type { Flower } from "../features/flower/flower.type.ts";
import { deleteFlower, waterFlower } from "../features/flower/flower.slice.ts";
import { useAppDispatch } from "../app/hooks.ts";

interface Props {
    flower: Flower
}

interface WaterStatus {
    needsAttention: boolean
    label: string
    color: string
    percent: number
    daysLeft: number
}

function FlowerItem({ flower }: Props) {
    const dispatch = useAppDispatch()

    const handleDelete = (id: string) => {
        dispatch(deleteFlower(id))
    }

    const handleWater = (id: string) => {
        dispatch(waterFlower(id))
    }

    const getWateringStatus = (): WaterStatus => {
        if (!flower.lastWateredAt) {
            return { needsAttention: true, label: "Needs First Water", color: "amber", percent: 0, daysLeft: 0 };
        }

        const lastDate = new Date(flower.lastWateredAt).getTime();
        const now = new Date().getTime();
        const daysPassed = (now - lastDate) / (1000 * 60 * 60 * 24);

        const percentRemaining = Math.max(0, Math.min(100, ((flower.waterDuration - daysPassed) / flower.waterDuration) * 100));
        const daysLeft = Math.max(0, Math.ceil(flower.waterDuration - daysPassed));

        if (daysPassed >= flower.waterDuration) {
            return { needsAttention: true, label: "Thirsty", color: "amber", percent: 0, daysLeft: 0 };
        }

        return {
            needsAttention: false,
            label: "Happy",
            color: "emerald",
            percent: percentRemaining,
            daysLeft: daysLeft
        };
    };

    const status = getWateringStatus();

    return (
        <div className={`group bg-white/70 backdrop-blur-md p-6 rounded-[2rem] border transition-all duration-300 shadow-xl ${
            status.needsAttention
                ? 'border-amber-200 shadow-amber-900/5'
                : 'border-emerald-100/50 shadow-emerald-900/5 hover:shadow-emerald-900/10'
        } hover:-translate-y-1`}>

            <div className="flex justify-between items-start mb-4">
                {/* Status Badge */}
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    status.color === 'amber'
                        ? 'bg-amber-50 text-amber-600 border-amber-100'
                        : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${status.color === 'amber' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                    {status.label}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1">
                    {/* Water Button */}
                    <button
                        onClick={() => handleWater(flower._id)}
                        className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all active:scale-90"
                        title="Water plant"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                        </svg>
                    </button>

                    {/* Delete Button */}
                    <button
                        className="text-rose-300 hover:text-rose-500 hover:bg-rose-50 p-2 rounded-full transition-all active:scale-90"
                        onClick={() => handleDelete(flower._id)}
                        title="Delete plant"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                    status.needsAttention ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white'
                }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-emerald-950">{flower.name}</h3>
            </div>

            <div className="space-y-2 mb-6">
                <div className="flex justify-between items-end px-1">
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-emerald-800/40">Hydration Level</span>
                    <span className={`text-xs font-black ${status.color === 'amber' ? 'text-amber-600' : 'text-blue-500'}`}>
                        {status.daysLeft} {status.daysLeft === 1 ? 'day' : 'days'} left
                    </span>
                </div>
                <div className="w-full h-2 bg-emerald-50 rounded-full overflow-hidden border border-emerald-100/30">
                    <div
                        className={`h-full transition-all duration-1000 ease-out rounded-full ${
                            status.color === 'amber' ? 'bg-amber-400' : 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]'
                        }`}
                        style={{ width: `${status.percent}%` }}
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                    <span className="text-xs font-bold uppercase tracking-tight">Cycle: {flower.waterDuration} days</span>
                </div>
            </div>
        </div>
    );
}

export default FlowerItem;
