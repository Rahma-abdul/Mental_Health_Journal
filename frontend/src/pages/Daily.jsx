import React, { useState } from "react";
import Sidebar from "./Sidebar";

export default function Daily() {
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  const [mood, setMood] = useState("");

  return <>
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Daily Journal
        </h2>

        {/* Title Input */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Entry title"
          />
        </div>

        {/* Daily Entry Textarea */}
        <div className="mb-4">
          <label
            htmlFor="entry"
            className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
          >
            Daily Entry
          </label>
          <textarea
            id="entry"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            rows="6"
            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>

        {/* Mood Selector
        <div className="mb-4">
          <label
            htmlFor="mood"
            className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
          >
            Mood
          </label>
          <select
            id="mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="block w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Select your mood</option>
            <option value="happy">😊 Happy</option>
            <option value="sad">😢 Sad</option>
            <option value="anxious">😰 Neutral</option>
            <option value="excited">🤩 Angry</option>
            <option value="tired">😴 Emotional</option>
          </select>
        </div> */}
      </div>

      <Sidebar />
    </>
}

