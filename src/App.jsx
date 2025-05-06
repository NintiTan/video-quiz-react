import { useState, useRef } from "react";

const quizData = [
  { video: "video1.mp4", question: "What color was the object?" },
  { video: "video2.mp4", question: "How many people did you see?" },
  { video: "video3.mp4", question: "What animal appeared?" }
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
      alert("Quiz complete! Answers: " + JSON.stringify([...answers, newAnswer]));
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