import React, { useState } from "react";
import Question from "./Question.tsx";

interface AssessmentProps {
  questions: Array<{
    type: string;
    question: string;
    options?: string[];
    correctAnswer: string;
  }>;
  onComplete: () => void;
}

const Assessment: React.FC<AssessmentProps> = ({ questions, onComplete }) => {
  const [answers, setAnswers] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>("");

  const handleAnswer = (index: number, answer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    const isCorrect = questions.every(
      (q, i) => answers[i]?.toLowerCase() === q.correctAnswer.toLowerCase()
    );

    // Update feedback
    setFeedback(isCorrect ? "Correct! You can proceed." : "Some answers are incorrect.");

    if (isCorrect) {
      // Delay calling `onComplete` to show feedback
      setTimeout(() => {
        onComplete();
      }, 2000); // 2-second delay
    }
  };

  const isAllAnswered = questions.every((_, i) => answers[i] && answers[i].trim() !== "");

  return (
    <div>
      {questions.map((q, index) => (
        <Question
          key={index}
          type={q.type}
          question={q.question}
          options={q.options}
          onAnswer={(answer) => handleAnswer(index, answer)}
        />
      ))}
      <button onClick={handleSubmit} disabled={!isAllAnswered}>
        Submit
      </button>
      <p>{feedback}</p>
    </div>
  );
};

export default Assessment;
