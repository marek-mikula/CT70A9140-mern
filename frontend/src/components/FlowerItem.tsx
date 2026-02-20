import {type Flower, lightLevels, soilTypes} from "../features/flower/flower.type.ts";
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

        const lastDate = new Date(flower.lastWateredAt).getTime()
        const now = new Date().getTime()
        const daysPassed = (now - lastDate) / (1000 * 60 * 60 * 24)

        const percentRemaining = Math.max(0, Math.min(100, ((flower.waterDuration - daysPassed) / flower.waterDuration) * 100))
        const daysLeft = Math.max(0, Math.ceil(flower.waterDuration - daysPassed))

        if (daysPassed >= flower.waterDuration) {
            return { needsAttention: true, label: "Thirsty", color: "amber", percent: 0, daysLeft: 0 }
        }

        return {
            needsAttention: false,
            label: "Happy",
            color: "emerald",
            percent: percentRemaining,
            daysLeft: daysLeft
        }
    }

    const status = getWateringStatus()

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
                    <button
                        onClick={() => handleWater(flower._id)}
                        className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all active:scale-90"
                        title="Water plant"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                        </svg>
                    </button>

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
                    status.needsAttention ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="2" /><path d="M12 8c2-4 6-4 6 0s-4 4-6 4" /><path d="M12 8c-2-4-6-4-6 0s4 4 6 4" /><path d="M16 12c4 2 4 6 0 6s-4-4-4-6" /><path d="M16 12c4-2 4-6 0-6s-4 4-4 6" /><path d="M12 16c-2 4-6 4-6 0s4-4 6-4" /><path d="M12 16c2 4 6 4 6 0s-4-4-6-4" /><path d="M8 12c-4-2-4-6 0-6s4 4 4 6" /><path d="M8 12c-4 2-4 6 0 6s4-4 4-6" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-emerald-950 leading-none">{flower.name}</h3>
            </div>

            {/* Hydration Progress */}
            <div className="space-y-2 mb-8">
                <div className="flex justify-between items-end px-1">
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-emerald-800/40">Hydration Level</span>
                    <span className={`text-xs font-black ${status.color === 'amber' ? 'text-amber-600' : 'text-blue-500'}`}>
                        {status.daysLeft} {status.daysLeft === 1 ? 'day' : 'days'} left
                    </span>
                </div>
                <div className="w-full h-2 bg-blue-50 rounded-full overflow-hidden border border-emerald-100/30">
                    <div
                        className={`h-full transition-all duration-1000 ease-out rounded-full ${
                            status.color === 'amber' ? 'bg-amber-400' : 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]'
                        }`}
                        style={{ width: `${status.percent}%` }}
                    />
                </div>
            </div>

            {/* Unified Attributes Section */}
            <div className="flex flex-wrap items-center gap-2">
                {/* Light */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50/50 text-yellow-700 rounded-xl border border-yellow-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
                    </svg>
                    <span className="text-[10px] font-bold uppercase tracking-tight">{lightLevels[flower.lightLevel]}</span>
                </div>

                {/* Soil */}
                <div
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100/60 text-stone-700 rounded-xl border border-stone-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="size-3">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/>
                    </svg>
                    <span className="text-[10px] font-bold uppercase tracking-tight">{soilTypes[flower.soilType]}</span>
                </div>

                {/* Cycle */}
                <div
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-xl border border-blue-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" /><path d="M22 2v6h-6" />
                    </svg>
                    <span className="text-[10px] font-bold uppercase tracking-tight">{flower.waterDuration} {flower.waterDuration === 1 ? 'Day' : 'Days'}</span>
                </div>
            </div>
        </div>
    )
}

export default FlowerItem
