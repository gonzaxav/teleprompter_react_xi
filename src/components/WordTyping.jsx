// src/components/WordTyping.js
import React, { useState, useEffect } from "react";
import "./WordTyping.css"; // Import the stylesheet

const WordTyping = () => {
  const [inputText, setInputText] = useState("");
  const [words, setWords] = useState([]);
  const [speed, setSpeed] = useState(100); // Default speed in milliseconds
  const [comma, setComma] = useState(500); // Default speed in milliseconds
  const [period, setPeriod] = useState(700); // Default speed in milliseconds
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(true);

  const [computedWidthL, setComputedWidthL] = useState(0);
  const [computedWidthR1, setComputedWidthR1] = useState(0);
  const [computedWidthR2, setComputedWidthR2] = useState(0);
  const [computedWidthR3, setComputedWidthR3] = useState(0);
  const [computedWidthR4, setComputedWidthR4] = useState(0);

  useEffect(() => {
    setWords(inputText.split(/[\s\n-]+/));
    setCurrentIndex(0);
  }, [inputText]);

  useEffect(() => {

    const elementL = document.getElementById("leftElement");
    if (elementL) {
      const width = elementL.offsetWidth;
      setComputedWidthL(parseInt(width));
    }
    const elementR1 = document.getElementById("rightElement1");
    if (elementR1) {
      const width = elementR1.offsetWidth;
      setComputedWidthR1(parseInt(width));
    }
    const elementR2 = document.getElementById("rightElement2");
    if (elementR2) {
      const width = elementR2.offsetWidth;
      setComputedWidthR2(parseInt(width));
    }
    const elementR3 = document.getElementById("rightElement3");
    if (elementR3) {
      const width = elementR3.offsetWidth;
      setComputedWidthR3(parseInt(width));
    }
    const elementR4 = document.getElementById("rightElement4");
    if (elementR4) {
      const width = elementR4.offsetWidth;
      setComputedWidthR4(parseInt(width));
    }

    if (!paused) {
      const currentWord = words[currentIndex];
      const wordLength = currentWord ? currentWord.length : 0;
      const wordHasComma = wordLength > 0 ? currentWord.includes(",") : false;
      const wordHasDot = wordLength > 0 ? currentWord.includes(".") : false;
      const newSpeed = wordLength > 0 ? wordLength * speed : 100; // Adjust the formula as needed

      let finalSpeed = newSpeed;
      if (wordHasComma) {
        finalSpeed += parseInt(comma, 10);
      } else if (wordHasDot) {
        finalSpeed += parseInt(period, 10);
      }

      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex < words.length - 1 ? prevIndex + 1 : prevIndex
        );
      }, finalSpeed);

      return () => clearInterval(interval);
    }
  }, [words, currentIndex, paused]);

  const handleTextInputChange = (e) => {
    setInputText(e.target.value);
  };
  const handleSpeedInputChange = (e) => {
    setSpeed(e.target.value);
  };
  const handleCommaInputChange = (e) => {
    setComma(e.target.value);
  };
  const handlePeriodInputChange = (e) => {
    setPeriod(e.target.value);
  };
  const handleGoBack5 = (e) => {
    setCurrentIndex(currentIndex - 5 < 0 ? 0 : currentIndex - 5);
  };
  const handleGoForward5 = (e) => {
    setCurrentIndex(currentIndex + 5 >= words.length ? words.length-1 : currentIndex + 5);
  };
  const handleRestart = (e) => {
    setCurrentIndex(0);
    setPaused(true);
  };

  return (
    <div className="container vh-100 d-flex flex-column">
      <h1 className="w-100 text-center">Word Typing App</h1>
      <div className="mb-3">
        <label htmlFor="textToRead" className="form-label">
          Text to read:
        </label>
        <textarea
          className="form-control"
          id="textToRead"
          rows="3"
          placeholder="Type a paragraph..."
          value={inputText}
          onChange={handleTextInputChange}
        />
      </div>
      <div className="mb-3 d-flex gap-3">
        <div className="w-25">
          <label htmlFor="speedInMs" className="form-label">
            Speed in ms
          </label>
          <input
            type="text"
            className="form-control"
            id="speedInMs"
            placeholder="100..."
            value={speed}
            onChange={handleSpeedInputChange}
          />
        </div>
        <div className="w-25">
          <label htmlFor="commaInMs" className="form-label">
            Comma in ms
          </label>
          <input
            type="text"
            className="form-control"
            id="commaInMs"
            placeholder="500..."
            value={comma}
            onChange={handleCommaInputChange}
          />
        </div>
        <div className="w-25">
          <label htmlFor="periodInMs" className="form-label">
            Period in ms
          </label>
          <input
            type="text"
            className="form-control"
            id="periodInMs"
            placeholder="100..."
            value={period}
            onChange={handlePeriodInputChange}
          />
        </div>
        <div className="w-25">
          <button
            className="btn btn-success me-2"
            onClick={() => setPaused(!paused)}
          >
            {paused ? "Play" : "Pause"}
          </button>
          <button
            className="btn btn-success me-2"
            onClick={handleGoBack5}
          >
            -5
          </button>
          <button
            className="btn btn-success me-2"
            onClick={handleGoForward5}
          >
            +5
          </button>
          <button
            className="btn btn-success me-2"
            onClick={handleRestart}
          >
            Restart
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="position-relative">
          <span
            className="highlighted-word-ba mx-4 position-absolute beforeText"
            style={{ left: `-${computedWidthL + 25}px` }}
            id="leftElement"
          >
            {words[currentIndex - 1]}
          </span>
          <span className="highlighted-word mx-4">{words[currentIndex]}</span>
          {words[currentIndex + 1] &&
          <span
            className={`${/[.?!]/.test(words[currentIndex + 1]) ? "highlighted-word-ba-period" : /[,;:-]/.test(words[currentIndex + 1]) ? "highlighted-word-ba-coma" : "highlighted-word-ba"} mx-4 position-absolute afterText`}
            style={{ right: `-${computedWidthR1 + 25}px` }}
            id="rightElement1"
          >
            {words[currentIndex + 1]}
          </span>}
          {words[currentIndex + 2] && 
          <span
            className={`${/[.?!]/.test(words[currentIndex + 2]) ? "highlighted-word-ba-period" : /[,;:-]/.test(words[currentIndex + 2]) ? "highlighted-word-ba-coma" : "highlighted-word-ba"} mx-4 position-absolute afterText`}
            style={{ right: `-${computedWidthR1 + computedWidthR2 + 50}px` }}
            id="rightElement2"
          >
            {words[currentIndex + 2]}
          </span>}
          {words[currentIndex + 3] && 
          <span
            className={`${/[.?!]/.test(words[currentIndex + 3]) ? "highlighted-word-ba-period" : /[,;:-]/.test(words[currentIndex + 3]) ? "highlighted-word-ba-coma" : "highlighted-word-ba"} mx-4 position-absolute afterText`}
            style={{ right: `-${computedWidthR1 + computedWidthR2 + computedWidthR3 + 75}px` }}
            id="rightElement3"
          >
            {words[currentIndex + 3]}
          </span>}
          {words[currentIndex + 4] && 
          <span
            className={`${/[.?!]/.test(words[currentIndex + 4]) ? "highlighted-word-ba-period" : /[,;:-]/.test(words[currentIndex + 4]) ? "highlighted-word-ba-coma" : "highlighted-word-ba"} mx-4 position-absolute afterText`}
            style={{ right: `-${computedWidthR1 + computedWidthR2 + computedWidthR3 + computedWidthR4 + 100}px` }}
            id="rightElement4"
          >
            {words[currentIndex + 4]}
          </span>}
        </div>
      </div>
    </div>
  );
};

export default WordTyping;
