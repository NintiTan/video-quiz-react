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
  const [userAnswer, setUserAnswer] = useState('');
  const answerRef = useRef(null);

  const handleSubmit = async () => {
    const newAnswer = userAnswer;

    setAnswers([...answers, { question: quizData[currentIndex].question, answer: newAnswer }]);
    setShowQuestion(false);
    if (answerRef.current) answerRef.current.checked = false;

    await fetch('/api/saveAnswer', {
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
      alert('Test complete! Here are your answers: ' + JSON.stringify(answers));
    }
  };

  return (
    <div>
      <h1>Quiz App</h1>
      {showQuestion && (
        <div>
          <p>{quizData[currentIndex].question}</p>
          <ul>
            {(quizData[currentIndex].options || ['Ja', 'Nee']).map((option, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name={`question${currentIndex}`}
                    value={option}
                    ref={answerRef}
                    onChange={(e) => setUserAnswer(e.target.value)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={handleSubmit}>Submit Answer</button>
        </div>
      )}
      {!showQuestion && <p>Your answer was: {userAnswer}</p>}
    </div>
  );
}

export default App;
