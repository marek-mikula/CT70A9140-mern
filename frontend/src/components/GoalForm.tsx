import {useState} from "react";
import {type SubmitEvent} from "react";
import {useAppDispatch} from "../app/hooks.ts";
import {storeGoal} from "../features/goal/goal.slice.ts";

function GoalForm() {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');

    const dispatch = useAppDispatch()

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            setError('Please, fill in the title.')
            return
        }

        setError('')
        setTitle('')

        dispatch(storeGoal({
            title: title.trim()!
        }))
    };

    return (
        <div className="flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-full bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100"
            >
                <div className="space-y-6">
                    {/* Title field */}
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="title"
                            className="text-xs font-semibold uppercase tracking-wider text-gray-400 ml-4"
                        >
                            Goal title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Learn React"
                            className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-blue-400/50 transition-all outline-none"
                            required
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="px-4 py-2 bg-red-50 rounded-xl border border-red-100">
                            <p className="text-sm text-red-500 font-medium">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 bg-gray-900 hover:bg-black text-white font-medium rounded-2xl transition-all active:scale-[0.98]"
                    >
                        Create Goal
                    </button>
                </div>
            </form>
        </div>
    );
}

export default GoalForm
