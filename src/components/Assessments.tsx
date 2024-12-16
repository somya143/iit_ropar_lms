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
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(""));
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
    setFeedback(isCorrect ? "Correct! You can proceed. 🎉" : "Some answers are incorrect. 😅");

    if (isCorrect) {
      // Delay calling `onComplete` to show feedback
      setTimeout(() => {
        onComplete();
      }, 5000); // 5-second delay
    }
  };

  // const isAllAnswered = questions.every((_, i) => answers[i] && answers[i].trim() !== "");
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
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "20px" }}>
      <button onClick={handleSubmit} style={{background:"teal",color:"#fff"}} disabled={!isAllAnswered}>
        Submit
      </button>
      <p
        style={{
          margin: 0,
          color: feedback.includes("Correct") ? "green" : feedback ? "red" : "black",
          fontWeight: "bold",
        }}
      >
        {feedback}
      </p>
    </div>
    </div>
  );
};

export default Assessment;
