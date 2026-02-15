import type {Goal} from "../features/goal/goal.type.ts";
import {useAppDispatch} from "../app/hooks.ts";
import {deleteGoal} from "../features/goal/goal.slice.ts";

interface Props {
    goals: Goal[]
}

const GoalList = ({goals}: Props) => {
    const dispatch = useAppDispatch()

    const handleDelete = (id: string) => {
        dispatch(deleteGoal(id))
    }

    return (
        <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 ml-4 mb-4">
                Your Journey
            </h3>

            {goals.length === 0 ? (
                <div className="p-8 text-center bg-gray-50 rounded-[2rem] border border-gray-100">
                    <p className="text-gray-400 text-sm">
                        You haven't created any goals.
                    </p>
                </div>
            ) : (
                <ul className="space-y-3">
                    {goals.map((goal) => (
                        <li
                            key={goal.id}
                            className="group flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          <span className="font-medium text-gray-700 tracking-tight">
                            {goal.title}
                          </span>
                            <button
                                onClick={() => handleDelete(goal.id)}
                                className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
                                aria-label="Delete goal"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GoalList;
