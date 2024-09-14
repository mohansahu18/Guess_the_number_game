import React, { useState, useEffect, useContext } from "react";
import Confetti from "react-confetti";
import { UserContext } from "../context/UserContext";
import { saveScore, fetchHighScores } from "../services/api";
import Leaderboard from "./Leaderboard";
import AdditionalInfo from "./AdditionalInfo";

export default function Game() {
  const [targetNumber, setTargetNumber] = useState(0);
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [message, setMessage] = useState("");
  const { user, logout } = useContext(UserContext);
  const [prevHighScore, setPrevHighScore] = useState(highScore);

  useEffect(() => {
    startNewGame();
    fetchHighScores().then(setLeaderboard);
  }, []);
  console.log(targetNumber, "targrt no ............");

  const updateData = async () => {
    setPrevHighScore(highScore);
    console.log("step 1");
    await saveScore(localStorage.getItem("token"), highScore).catch((error) => {
      console.error("Error saving score:", error);
    });
    console.log("step 2");
    await fetchHighScores().then(setLeaderboard);
    console.log("step 3");
  };
  useEffect(() => {
    // debugger;
    if (highScore > prevHighScore) {
      updateData();
    }
  }, [highScore, prevHighScore]);

  const startNewGame = (attempts) => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setAttempts(attempts ? attempts : 0);
    setMessage("");
  };

  const handleGuess = () => {
    const guessNumber = parseInt(guess);
    if (!guessNumber) {
      return;
    }
    setAttempts(attempts + 1);

    if (guessNumber === targetNumber) {
      const newScore = score + 50;
      setScore(newScore);

      if (newScore > highScore) {
        setHighScore(newScore);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }

      setMessage(
        `Congratulations! You guessed the number in ${attempts + 1} attempts!`
      );
      startNewGame(attempts);
    } else {
      setMessage(
        guessNumber < targetNumber
          ? "Too low! Try a higher number."
          : "Too high! Try a lower number."
      );
      setScore(0); // Reset score on incorrect guess
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 p-4">
      {showConfetti && <Confetti />}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Number Guessing Game
        </h1>
        <p className="mb-4 text-center">Welcome, {user?.username}!</p>
        <p className="mb-4 text-center">Guess a number between 1 and 100</p>
        <div className="flex mb-4">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter your guess"
            className="flex-grow mr-2 p-2 border rounded"
          />
          <button
            onClick={handleGuess}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Guess
          </button>
        </div>

        <AdditionalInfo
          message={message}
          attempts={attempts}
          score={score}
          highScore={highScore}
        />
        <Leaderboard leaderboard={leaderboard} />
        <button
          onClick={logout}
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
