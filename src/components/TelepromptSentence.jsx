// src/components/WordTyping.js
import React, { useState, useEffect } from "react";
import "./TelepromptSentence.css"; // Import the stylesheet

const WordTyping = () => {
  const [inputText, setInputText] = useState("");
  const [sentences, setSentences] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMouseLeftContainer = (e) => {
    if (e.clientX > window.innerWidth * 0.5) {
      handleGoForward1();
    } else {
      handleGoBack1();
    }
  };

  useEffect(() => {
    setSentences(
      inputText
        .replace(/\n/g, "")
        .replace(/([?.,])/g, "$1\n")
        .split(/[\n]+/)
        .filter(Boolean)
    );
    setCurrentIndex(0);
  }, [inputText]);

  const handleTextInputChange = (e) => {
    setInputText(e.target.value);
  };
  const handleGoBack1 = (e) => {
    setCurrentIndex(currentIndex - 1 < 0 ? 0 : currentIndex - 1);
  };
  const handleGoForward1 = (e) => {
    setCurrentIndex(
      currentIndex + 1 >= sentences.length
        ? sentences.length - 1
        : currentIndex + 1
    );
  };
  const handleRestart = (e) => {
    setCurrentIndex(0);
  };
  const handleGotolast = (e) => {
    setCurrentIndex(sentences.length - 1);
  };

  return (
    <section className="graybg">
      <div
        className="container blackbg vh-100 d-flex flex-column"
        onMouseLeave={handleMouseLeftContainer}
      >
        <h1 className="w-100 text-center m-0">Teleprompter App</h1>
        <div className="m-0">
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
        <div className="m-0 d-flex gap-3">
          <div className="w-100 d-flex justify-content-center gap-3 mt-2">
            <button className="btn btn-dark" onClick={handleRestart}>
              <i className="bi bi-skip-backward fs-3"></i>
            </button>
            <button className="btn btn-dark" onClick={handleGoBack1}>
              <i className="bi bi-caret-left fs-3"></i>
            </button>
            <button className="btn btn-dark" onClick={handleGoForward1}>
              <i className="bi bi-caret-right fs-3"></i>
            </button>
            <button className="btn btn-dark" onClick={handleGotolast}>
              <i className="bi bi-skip-forward fs-3"></i>
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="w-100 position-relative">
            <p className="highlighted-word text-center">
              {sentences[currentIndex]}
            </p>
            {sentences[currentIndex + 1] && (
              <p
                className={`highlighted-word-ba text-center position-absolute w-100 afterText`}
              >
                {sentences[currentIndex + 1]}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WordTyping;
