import { useState, type FormEvent } from "react";
import { useAppDispatch } from "../app/hooks.ts";
import { storeFlower } from "../features/flower/flower.slice.ts";
import {lightLevels, soilTypes} from "../features/flower/flower.type.ts";

function FlowerForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [waterDuration, setWaterDuration] = useState('');
    const [lightLevel, setLightLevel] = useState('medium');
    const [soilType, setSoilType] = useState('peat_moss');
    const [error, setError] = useState('');

    const dispatch = useAppDispatch();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !waterDuration.trim() || !lightLevel || !soilType) {
            setError('Please fill in all required fields.');
            return;
        }

        setError('');
        setName('');
        setWaterDuration('');
        setLightLevel('medium');
        setSoilType('standard');

        dispatch(storeFlower({
            name: name.trim(),
            waterDuration: Number(waterDuration),
            lightLevel,
            soilType
        }));
    };

    return (
        <div className="mx-auto max-w-md w-full">
            <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-emerald-900/10 border border-emerald-100/50 overflow-hidden transition-all duration-500">

                {/* Toggle Header */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-8 py-6 flex items-center justify-between hover:bg-emerald-50/30 transition-colors"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <h3 className="text-lg font-extrabold text-emerald-950 leading-tight">Add New Plant</h3>
                            <p className="text-xs text-emerald-600/60 font-medium">Expand to grow your garden</p>
                        </div>
                    </div>

                    <div className={`p-2 rounded-full bg-emerald-50 text-emerald-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                </button>

                <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                    <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4 border-t border-emerald-50/50 pt-6">

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-emerald-700/50 ml-5">Flower Name</label>
                            <input
                                type="text" value={name} onChange={(e) => setName(e.target.value)}
                                placeholder="Monstera Deliciosa"
                                className="w-full px-6 py-4 bg-emerald-50/50 border border-emerald-100/50 rounded-[1.5rem] text-emerald-900 placeholder:text-emerald-300 focus:ring-4 focus:ring-emerald-400/10 focus:bg-white transition-all outline-none"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-emerald-700/50 ml-5">Water Every (Days)</label>
                            <div className="relative">
                                <input
                                    type="number" min="1" value={waterDuration} onChange={(e) => setWaterDuration(e.target.value)}
                                    placeholder="7"
                                    className="w-full px-6 py-4 bg-emerald-50/50 border border-emerald-100/50 rounded-[1.5rem] text-emerald-900 focus:ring-4 focus:ring-emerald-400/10 focus:bg-white transition-all outline-none number-input-no-spin"
                                    required
                                />
                                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-400 uppercase tracking-tighter">Days</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-emerald-700/50 ml-5">Light Level</label>
                            <select
                                value={lightLevel}
                                onChange={(e) => setLightLevel(e.target.value)}
                                className="w-full px-6 py-4 bg-emerald-50/50 border border-emerald-100/50 rounded-[1.5rem] text-emerald-900 focus:ring-4 focus:ring-emerald-400/10 focus:bg-white transition-all outline-none appearance-none cursor-pointer"
                            >
                                {Object.entries(lightLevels).map((value) => (
                                    <option value={value[0]}>{value[1]}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-emerald-700/50 ml-5">Soil Type</label>
                            <select
                                value={soilType}
                                onChange={(e) => setSoilType(e.target.value)}
                                className="w-full px-6 py-4 bg-emerald-50/50 border border-emerald-100/50 rounded-[1.5rem] text-emerald-900 focus:ring-4 focus:ring-emerald-400/10 focus:bg-white transition-all outline-none appearance-none cursor-pointer"
                            >
                                {Object.entries(soilTypes).map((value) => (
                                    <option value={value[0]}>{value[1]}</option>
                                ))}
                            </select>
                        </div>

                        {error && (
                            <div className="px-5 py-3 bg-rose-50 rounded-2xl border border-rose-100 animate-in fade-in zoom-in-95 duration-200 text-sm text-rose-500 font-semibold text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-4 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-[1.5rem] transition-all active:scale-[0.97] shadow-lg shadow-emerald-200"
                        >
                            Plant Flower
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FlowerForm;
