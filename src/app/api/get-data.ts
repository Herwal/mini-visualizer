export type Questions = {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export const getData = async (): Promise<Questions[]> => {
  const response = await fetch("https://opentdb.com/api.php?amount=50");
  const data = await response.json();
  const questions: Questions[] = data.results.map(
    (question: Questions) => question,
  );

  return questions;
};
