import React from "react";

interface QuestionProps {
  type: string;
  question: string;
  options?: string[];
  onAnswer: (answer: string) => void;
}

const Question: React.FC<QuestionProps> = ({ type, question, options, onAnswer }) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <p>{question}</p>
      {type === "multiple-choice" &&
        options?.map((option, index) => (
          <label key={index} style={{ display: "block", margin: "5px 0" }}>
            <input
              type="radio"
              name={question}
              value={option}
              onChange={(e) => onAnswer(e.target.value)}
            />
            {option}
          </label>
        ))}
      {type === "short-answer" && (
        <input
          type="text"
          placeholder="Type your answer here"
          onBlur={(e) => onAnswer(e.target.value)}
        />
      )}
    </div>
  );
};

export default Question;
