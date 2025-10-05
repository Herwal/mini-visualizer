"use client";

import { useEffect, useState } from "react";
import type { Questions } from "./api/get-data";
import { getData } from "./api/get-data";
import Graphs from "./components/graphs";

export default function Home() {
  const [showCategories, setShowCategories] = useState(false);
  const [questions, setQuestions] = useState<Questions[]>([]);
  const categories: string[] = questions.map(
    (item: Questions) => item.category,
  );

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getData();
      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  const uniqueCategories = Array.from(new Set(categories));

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>
          <button
            type="button"
            onClick={() => setShowCategories((prev) => !prev)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            {showCategories ? "Hide Categories" : "Show Categories"}
          </button>
        </div>

        {showCategories && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-3">
              Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {uniqueCategories.map((category: string) => (
                <span
                  key={category}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {category
                    .replace(/^Entertainment:\s*/, "")
                    .replace(/^Science:\s*/, "")}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex">
        <div className="flex-1 overflow-hidden">
          <Graphs />
        </div>
      </div>
    </main>
  );
}
