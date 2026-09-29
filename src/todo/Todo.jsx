import React, { useEffect, useState } from "react";

import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Todo = () => {

    const [inputValue, setInputValue] = useState("");
    const [task, setTask] = useState([]);
    const [dateTime, setDateTime] = useState("");


    const handleInputValue = (value) => {
        setInputValue(value);
    };


    const handleSubmit = (e) => {

        e.preventDefault();

        if (!inputValue.trim()) {
            return;
        }

        setTask((pre) => {

            if (pre.some((currTask) => currTask.text === inputValue.trim())) {
                return pre;
            }

            return [
                ...pre,
                {
                    text: inputValue.trim(),
                    completed: false,
                },
            ];
        });

        setInputValue("");
    };


    // Mark task as complete / incomplete
    const handleCompleteTask = (value) => {

        setTask((pre) => {

            return pre.map((currTask) => {

                if (currTask.text === value) {

                    return {
                        ...currTask,
                        completed: !currTask.completed,
                    };

                }

                return currTask;
            });

        });
    };


    // Delete single task
    const deletedTask = (value) => {

        setTask((pre) => {

            return pre.filter(
                (currTask) => currTask.text !== value
            );

        });
    };


    // Clear all tasks
    const handleClearBtn = () => {
        setTask([]);
    };


    // Date and time
    useEffect(() => {

        const updateDateTime = () => {

            const now = new Date();

            const formattedDate = now.toLocaleDateString();
            const formattedTime = now.toLocaleTimeString();

            setDateTime(
                `${formattedDate} - ${formattedTime}`
            );
        };

        updateDateTime();

        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);

    }, []);


    return (

        <section className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-linear-to-br from-stone-50 via-emerald-50 to-orange-50 px-4 py-14">

            {/* Background soft decoration */}

            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-orange-100/60 blur-3xl" />


            {/* Header */}

            <header className="relative z-10 w-full max-w-2xl text-center">

                <p className="mb-3 text-xs font-bold tracking-[0.2em] text-emerald-700">
                    DAILY PLANNER
                </p>

                <h1 className="font-serif text-5xl font-bold text-emerald-950 sm:text-6xl">
                    Todo List
                </h1>


                {/* Date & Time */}

                <div className="mx-auto mt-6 w-fit rounded-xl bg-emerald-950 px-6 py-3 text-center shadow-lg">

                    <p className="mb-1 text-[10px] font-bold tracking-widest text-lime-300">
                        TODAY · LOCAL TIME
                    </p>

                    <p className="text-sm font-semibold text-stone-100 sm:text-base">
                        {dateTime}
                    </p>

                </div>

            </header>


            {/* Add Task */}

            <section className="relative z-10 mt-10 w-full max-w-xl">

                <form onSubmit={handleSubmit}>

                    <div className="flex gap-2">

                        <input
                            value={inputValue}
                            onChange={(event) =>
                                handleInputValue(event.target.value)
                            }
                            className="min-w-0 flex-1 rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm text-emerald-950 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                            type="text"
                            placeholder="Enter name of the task"
                        />

                        <button
                            className="rounded-lg bg-lime-300 px-5 py-3 text-sm font-bold text-emerald-950 shadow-sm transition hover:bg-lime-400 active:scale-95"
                            type="submit"
                        >
                            Add Task
                        </button>

                    </div>

                </form>

            </section>


            {/* Tasks */}

            <section className="relative z-10 mt-8 w-full max-w-xl">

                <p className="mb-3 text-left text-xs font-bold tracking-widest text-emerald-800">
                    YOUR TASKS
                </p>


                <ul className="space-y-3">

                    {task.map((task, index) => (

                        <li
                            key={index}
                            className="flex min-h-16 items-center justify-between gap-4 rounded-lg border border-stone-200 border-l-4 border-l-emerald-500 bg-white px-4 py-3 text-sm font-medium text-emerald-950 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >

                            <span
                                className={`wrap-break-wordbreak-words ${
                                    task.completed
                                        ? "text-stone-400 line-through"
                                        : ""
                                }`}
                            >
                                {task.text}
                            </span>


                            <div className="flex shrink-0 gap-1">

                                {/* Check */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleCompleteTask(task.text)
                                    }
                                    className={`grid h-9 w-9 place-items-center rounded-lg transition ${
                                        task.completed
                                            ? "bg-emerald-600 text-white"
                                            : "text-emerald-600 hover:bg-emerald-600 hover:text-white"
                                    }`}
                                >
                                    <FaCheck size={18} />
                                </button>


                                {/* Delete */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        deletedTask(task.text)
                                    }
                                    className="grid h-9 w-9 place-items-center rounded-lg text-red-400 transition hover:bg-red-500 hover:text-white"
                                >
                                    <MdDelete size={21} />
                                </button>

                            </div>

                        </li>

                    ))}

                </ul>


                {/* Empty state */}

                {task.length === 0 && (

                    <div className="rounded-lg border border-dashed border-stone-300 bg-white/60 px-5 py-8 text-center text-sm text-stone-500">
                        Your list is clear. Add a task to get started.
                    </div>

                )}

            </section>


            {/* Clear All */}

            <section className="relative z-10 mt-5">

                <button
                    onClick={handleClearBtn}
                    className="rounded-lg border border-stone-300 bg-white/70 px-5 py-2.5 text-sm font-bold text-stone-600 transition hover:border-red-300 hover:bg-red-500 hover:text-white active:scale-95"
                >
                    Clear All
                </button>

            </section>

        </section>
    );
};

export default Todo;