"use client";

import { useEffect, useState } from "react";
import { getData, Questions } from "./api/get-data";

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

  console.log(questions);

  const uniqueCategories = Array.from(new Set(categories));

  return (
    <main className="">
      <div className="flex flex-col items-center p-4">
        {/* div for buttons */}
        <div className="flex flex-row items-center justify-between p-24">
          <button
            type="button"
            onClick={() => setShowCategories((prev) => !prev)}
            className="bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700"
          >
            {showCategories ? "Hide Categories" : "Show Categories"}
          </button>
        </div>

        <div>
          {showCategories && (
            <div className="flex flex-wrap gap-4 justify-center mx-4 w-1/2">
              {uniqueCategories.map((category: string) => (
              <div key={category} className="p-4 border rounded shadow">
              {category}
              </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
