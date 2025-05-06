import { useState, useRef } from "react";

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

  const handleSubmit = () => {
    const newAnswer = answerRef.current.value;
    setAnswers([...answers, newAnswer]);
    setShowQuestion(false);
    answerRef.current.value = "";
    if (currentIndex + 1 < quizData.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("Test compleet, hier zijn je antwoorden: " + JSON.stringify([...answers, newAnswer]));
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Video Quiz</h2>
      <video
        key={current.video}
        width="600"
        controls
        autoPlay
        onEnded={handleVideoEnded}
      >
        <source src={current.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {showQuestion && (
        <div style={{ marginTop: "20px" }}>
          <p>{current.question}</p>
          <input ref={answerRef} type="text" placeholder="Your answer..." />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}