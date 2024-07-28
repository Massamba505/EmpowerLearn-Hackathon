import React, { useState, useEffect } from 'react';
import './Quiz.css';

const Quiz = ({ category, onReturnToCards }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, [category]);

  const fetchQuestions = async () => {
    const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`);
    const data = await response.json();
    const formattedQuestions = data.results.map((questionItem) => {
      const formattedQuestion = {
        question: questionItem.question,
        answers: [
          ...questionItem.incorrect_answers.map(answer => ({ text: answer, correct: false })),
          { text: questionItem.correct_answer, correct: true }
        ].sort(() => Math.random() - 0.5)
      };
      return formattedQuestion;
    });
    setQuestions(formattedQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
  };

  const handleAnswerOptionClick = (isCorrect) => {
    setSelectedAnswer(isCorrect);

    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestionIndex + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestionIndex(nextQuestion);
        setSelectedAnswer(null);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const handleRestartQuiz = () => {
    onReturnToCards();
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <h1>Simple Quiz</h1>
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
          <button onClick={handleRestartQuiz} className="next-btn refresh-btn">Refresh Quiz</button>
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestionIndex + 1}</span>/{questions.length}
            </div>
            <div className="question-text" dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question }} />
          </div>
          <div className="answer-section">
            {questions[currentQuestionIndex].answers.map((answerOption, index) => (
              <button
                key={index}
                className={`btn ${selectedAnswer !== null && (answerOption.correct ? 'correct' : 'wrong')}`}
                onClick={() => handleAnswerOptionClick(answerOption.correct)}
                disabled={selectedAnswer !== null}
                dangerouslySetInnerHTML={{ __html: answerOption.text }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
