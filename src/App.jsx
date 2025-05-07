import { useState, useRef } from "react";
import './App.css';

const quizData = [
  { video: "f1s1.mov", question: "Je wilt een evenement aanmaken, hoe ga je verder?" },
  { video: "f1s2.mov", question: "Je wilt de gegevens van het evenement invoeren, hoe ga je verder?" },
  { video: "f1s3.mov", question: "Je bent klaar met het invoeren van de gegevens, hoe ga je verder?" },
  { video: "f1s4.mov", question: "Je wilt beschikbare data selecteren, hoe ga je verder?" },
  { video: "f1s5.mov", question: "Je bent klaar met data selecteren, hoe ga je verder?" },
  { video: "f1s6.mov", question: "Je wilt het evenement delen met anderen, hoe ga je verder?" },
  { video: "f1s6.mov", question: "Je bent klaar met het evenement, hoe ga je verder?" }
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(true);
  const [answers, setAnswers] = useState([]);
  const answerRef = useRef(null);

  const handleSubmit = async () => {
    const newAnswer = answerRef.current.value;

    setAnswers([...answers, { question: quizData[currentIndex].question, answer: newAnswer }]);
    setShowQuestion(false);
    answerRef.current.value = '';

    await fetch('../pages/api/saveAnswer.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 'user123',
        questionId: `q${currentIndex + 1}`,
        answer: newAnswer,
      }),
    });

    if (currentIndex + 1 < quizData.length) {
      setCurrentIndex(currentIndex + 1);
      setShowQuestion(true);
    } else {
      alert('Test complete! Here are your answers: ' + JSON.stringify([...answers, {
        question: quizData[currentIndex].question,
        answer: newAnswer
      }]));
    }
  };

  return (
    <div className="app">
      <h1>Quiz App</h1>
      {showQuestion && (
        <div className="question-block">
          <video width="640" height="360" controls>
            <source src={quizData[currentIndex].video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p>{quizData[currentIndex].question}</p>
          <input
            type="text"
            placeholder="Typ je antwoord hier..."
            ref={answerRef}
            className="text-input"
          />
          <button onClick={handleSubmit}>Verstuur antwoord</button>
        </div>
      )}
    </div>
  );
}

export default App;
