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

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [answers, setAnswers] = useState([]);
  const answerRef = useRef();

  const current = quizData[currentIndex];

  const handleVideoEnded = () => {
    setShowQuestion(true);
  };


  await fetch('/api/saveAnswer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: 'user123',   // replace with dynamic user ID if needed
      questionId: 'q1',    // dynamic question ID
      answer: newAnswer,   // the user's answer
    }),
  });
  
}