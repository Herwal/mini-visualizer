"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Questions } from "../api/get-data";
import { getData } from "../api/get-data";

const decodeHtml = (html: string): string => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

type CategoryData = {
  category: string;
  count: number;
};

type DifficultyData = {
  difficulty: string;
  count: number;
};

const COLORS = {
  easy: "#10b981",
  medium: "#f59e0b",
  hard: "#ef4444",
};

export default function Graphs() {
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getData();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const filteredQuestions =
    selectedCategory === "all"
      ? questions
      : questions.filter((q) => q.category === selectedCategory);

  const processCategoryData = (): CategoryData[] => {
    const categoryCount = filteredQuestions.reduce(
      (acc, question) => {
        acc[question.category] = (acc[question.category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(categoryCount).map(([category, count]) => ({
      category: category
        .replace(/^Entertainment:\s*/, "")
        .replace(/^Science:\s*/, ""),
      count,
    }));
  };

  const processDifficultyData = (): DifficultyData[] => {
    const difficultyCount = filteredQuestions.reduce(
      (acc, question) => {
        acc[question.difficulty] = (acc[question.difficulty] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(difficultyCount).map(([difficulty, count]) => ({
      difficulty,
      count,
    }));
  };

  const uniqueCategories = Array.from(
    new Set(questions.map((q) => q.category)),
  );

  const categoryData = processCategoryData();
  const difficultyData = processDifficultyData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading questions data...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <label
              htmlFor="category-filter"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Filter by Category:
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">
                All Categories ({questions.length} questions)
              </option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category
                    .replace(/^Entertainment:\s*/, "")
                    .replace(/^Science:\s*/, "")}
                  ({questions.filter((q) => q.category === category).length}{" "}
                  questions)
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Questions by Category
            </h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="category"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval={0}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => [value, "Questions"]}
                    labelFormatter={(label: string) => `Category: ${label}`}
                  />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Questions by Difficulty
            </h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={difficultyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ difficulty, count }) => `${difficulty}: ${count}`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="difficulty"
                  >
                    {difficultyData.map((entry) => (
                      <Cell
                        key={entry.difficulty}
                        fill={
                          COLORS[entry.difficulty as keyof typeof COLORS] ||
                          "#8884d8"
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [value, "Questions"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {selectedCategory === "all" ? (
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-md">
                <div className="text-xl font-bold text-blue-600">
                  {filteredQuestions.length}
                </div>
                <div className="text-xs text-gray-600">Total Questions</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-md">
                <div className="text-xl font-bold text-green-600">
                  {uniqueCategories.length}
                </div>
                <div className="text-xs text-gray-600">Categories</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-md">
                <div className="text-xl font-bold text-purple-600">
                  {
                    Array.from(new Set(questions.map((q) => q.difficulty)))
                      .length
                  }
                </div>
                <div className="text-xs text-gray-600">Difficulty Levels</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Questions in{" "}
                {selectedCategory
                  .replace(/^Entertainment:\s*/, "")
                  .replace(/^Science:\s*/, "")}
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({filteredQuestions.length} questions)
                </span>
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {filteredQuestions.map((question) => (
                  <div
                    key={question.question}
                    className="bg-gray-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          question.difficulty === "easy"
                            ? "bg-green-100 text-green-800"
                            : question.difficulty === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {question.difficulty}
                      </span>
                    </div>

                    <h4 className="text-sm font-medium text-gray-900 mb-3 leading-relaxed">
                      {decodeHtml(question.question)}
                    </h4>

                    <div className="text-xs text-gray-600">
                      <span className="font-medium text-green-700">
                        Correct Answer:
                      </span>
                      <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded">
                        {decodeHtml(question.correct_answer)}
                      </span>
                    </div>

                    <div className="mt-2 text-xs text-gray-600">
                      <span className="font-medium text-red-700">
                        Incorrect Answers:
                      </span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {question.incorrect_answers.map((answer) => (
                          <span
                            key={answer}
                            className="bg-red-100 text-red-800 px-2 py-1 rounded"
                          >
                            {decodeHtml(answer)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
