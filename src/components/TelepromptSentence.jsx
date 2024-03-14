// src/components/WordTyping.js
import React, { useState, useEffect } from "react";
import "./TelepromptSentence.css"; // Import the stylesheet

const WordTyping = () => {
  const [inputText, setInputText] = useState("");
  const [sentences, setSentences] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [bgSelectedColor, setBgSelectedColor] = useState("#808080");
  const [textSelectedColor, setTextSelectedColor] = useState("#ffffff");
  const [textBorderSelectedColor, setTextBorderSelectedColor] =
    useState("#000000");
  const [nextTextSelectedColor, setNextTextSelectedColor] = useState("#454545");

  const [isAnimatingLeft, setIsAnimatingLeft] = useState(false);
  const [isAnimatingRight, setIsAnimatingRight] = useState(false);

  const handleMouseLeftArea = () => {
    if (currentIndex - 1 >= 0) {
      setIsAnimatingLeft(true); // Start the animation
      setTimeout(() => {
        setIsAnimatingLeft(false); // Stop the animation after 1 second
      }, 300);
    }
    handleGoBack1();
  };
  const handleMouseRightArea = () => {
    if (currentIndex + 1 < sentences.length) {
      setIsAnimatingRight(true); // Start the animation
      setTimeout(() => {
        setIsAnimatingRight(false); // Stop the animation after 1 second
      }, 300);
    }
    handleGoForward1();
  };

  const handleBgColorChange = (event) => {
    setBgSelectedColor(event.target.value);
  };
  const handleTextColorChange = (event) => {
    setTextSelectedColor(event.target.value);
  };
  const handleTextBorderColorChange = (event) => {
    setTextBorderSelectedColor(event.target.value);
  };
  const handleNextTextColorChange = (event) => {
    setNextTextSelectedColor(event.target.value);
  };

  useEffect(() => {
    const ellipsisPlaceholder = "###ELLIPSIS###";
    setSentences(
      inputText
        .replace(/\.\.\./g, ellipsisPlaceholder)
        .replace(/[\n]{2,}/g, "\n")
        .replace(/([?.,!])(?![\n])/g, "$1\n")
        .replace(/###ELLIPSIS###/g, "...")
        .split(/[\n]+/)
        .filter(Boolean)

      /*.replace(/\n/g, "")
        .replace(/\.\.\.\./g, ellipsisPlaceholder + "\n")
        .replace(/\.\.\./g, ellipsisPlaceholder)
        .replace(/([?.,!])/g, "$1\n")
        .replace(/###ELLIPSIS###/g, "...")
        .split(/[\n]+/)
        .filter(Boolean)*/
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
      <div className="container-fluid vh-100">
        <div className="row vh-100">
          <div
            className={`col-2 g-0 mouseHoverBg ${
              isAnimatingLeft ? "play-animation-bg" : ""
            }`}
          >
            <div
              className={`col-2 g-0 center-text h-100 w-100 d-flex justify-content-center align-items-center ${
                isAnimatingLeft ? "play-animation" : ""
              }`}
              onMouseEnter={handleMouseLeftArea}
            >
              <div className="center-text">Previous</div>
            </div>
          </div>
          <div className="col-8 g-0 d-flex flex-column">
            <div className="row g-0">
              <div className="col d-flex flex-column pb-3 g-0">
                <h1 className="w-100 text-center m-0">Teleprompter App</h1>
                <div className="m-0">
                  <textarea
                    className="form-control"
                    id="textToRead"
                    rows="3"
                    placeholder="Type a paragraph..."
                    value={inputText}
                    onChange={handleTextInputChange}
                    data-bs-theme="dark"
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
                    <input
                      className="h-100"
                      type="color"
                      value={bgSelectedColor}
                      onChange={handleBgColorChange}
                    />
                    <input
                      className="h-100"
                      type="color"
                      value={textSelectedColor}
                      onChange={handleTextColorChange}
                    />
                    <input
                      className="h-100"
                      type="color"
                      value={textBorderSelectedColor}
                      onChange={handleTextBorderColorChange}
                    />
                    <input
                      className="h-100"
                      type="color"
                      value={nextTextSelectedColor}
                      onChange={handleNextTextColorChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="row g-0 flex-grow-1"
              style={{ backgroundColor: bgSelectedColor }}
            >
              <div className="col h-100 d-flex flex-column">
                <div className="d-flex justify-content-center align-items-center h-100">
                  <div className="w-100 position-relative">
                    <p
                      className="highlighted-word text-center"
                      style={{
                        color: textSelectedColor,
                        WebkitTextStroke: `2px ${textBorderSelectedColor}`,
                      }}
                    >
                      {sentences[currentIndex]}
                    </p>
                    {sentences[currentIndex + 1] && (
                      <p
                        className={`highlighted-word-ba text-center position-absolute w-100 afterText`}
                        style={{ color: nextTextSelectedColor }}
                      >
                        {sentences[currentIndex + 1]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`col-2 g-0 mouseHoverBg ${
              isAnimatingRight ? "play-animation-bg" : ""
            }`}
          >
            <div
              className={`col-2 g-0 center-text h-100 w-100 d-flex justify-content-center align-items-center ${
                isAnimatingRight ? "play-animation" : ""
              }`}
              onMouseEnter={handleMouseRightArea}
            >
              <div className="center-text">Next</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WordTyping;
