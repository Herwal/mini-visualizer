type QuestionCardProps = {
  question: string;
  category: string;
};

export default function QuestionCard([
  { question, category },
]: QuestionCardProps[]) {
  return (
    <div key={question} className="flex flex-col items-center p-4">
      <div className="flex flex-row border-b-2 border-gray-500 w-full justify-between py-1">
        <h3 className="capitalize font-semibold text-lg text-black">
          {question}
        </h3>
        <p className={`rounded-md h-min darker`}>{category}</p>
      </div>
    </div>
  );
}
