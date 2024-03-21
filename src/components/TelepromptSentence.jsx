// src/components/WordTyping.js
import React, { useState, useEffect } from "react";
import "./TelepromptSentence.css"; // Import the stylesheet

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./dark-quill.css";

import DOMPurify from "dompurify";

const WordTyping = () => {
  const [inputText, setInputText] = useState("");
  const [sentences, setSentences] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [textToDisplay, setTextToDisplay] = useState("");
  const [nextTextToDisplay, setNextTextToDisplay] = useState("");

  const [displayingInput, setDisplayingInput] = useState(true);

  const [bgSelectedColor, setBgSelectedColor] = useState("#808080");
  const [textSelectedColor, setTextSelectedColor] = useState("#ffffff");
  const [textBorderSelectedColor, setTextBorderSelectedColor] =
    useState("#000000");
  const [nextTextSelectedColor, setNextTextSelectedColor] = useState("#454545");

  const [isAnimatingLeft, setIsAnimatingLeft] = useState(false);
  const [isAnimatingRight, setIsAnimatingRight] = useState(false);

  const handleMinimizeInput = () => {
    setDisplayingInput(!displayingInput);
  };

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
    let tempInputText = inputText.replace(/<\/p>\s*<p[^>]*>/g, "\n");
    tempInputText = DOMPurify.sanitize(tempInputText, {
      ALLOWED_TAGS: ["i", "em", "b", "strong", "u", "br", "\n"],
      ALLOWED_ATTR: ["style"],
    });

    const ellipsisPlaceholder = "###ELLIPSIS###";

    setSentences(
      tempInputText
        .replace(/\.\.\./g, ellipsisPlaceholder)
        .replace(/\s+(<\/(i|em|b|strong|u)>)/g, "$1 ")
        .replace(/(<(i|em|b|strong|u)>)\s+/g, " $1")
        .replace(/([?.,!])(?!["“”\n<])/g, "$1\n")
        .replace(/\s+\n/g, "\n")
        .replace(/([?.,!])(<\/(i|em|b|strong|u)>)(?![\n])/g, "$1$2\n")
        .replace(/###ELLIPSIS###/g, "...")
        .replace(/(?:\n|<br>){2,}/g, "\n")
        .split(/[\n]+/)
        .filter(Boolean)
    );
    setCurrentIndex(0);
  }, [inputText]);

  useEffect(() => {
    //current text
    const newText = sentences
      .map((sentence, index) => {
        let modifiedSentence = sentence;
        const hasClosingTag = /<\/(i|em|b|strong|u)>/.test(sentence);

        if (hasClosingTag) {
          modifiedSentence = modifiedSentence.replace(
            /<\/(i|em|b|strong|u)>/,
            `$&</span><span key=${index} style="display: ${
              index === currentIndex ? "inline" : "none"
            };">`
          );
        }

        return `<span key=${index} style="display: ${
          index === currentIndex ? "inline" : "none"
        };">${modifiedSentence}</span>`;
      })
      .join("");

    setTextToDisplay(newText);

    //next text
    const newNextText = sentences
      .slice(1)
      .map((sentence, index) => {
        let modifiedSentence = sentence;
        const hasClosingTag = /<\/(i|em|b|strong|u)>/.test(sentence);

        if (hasClosingTag) {
          modifiedSentence = modifiedSentence.replace(
            /<\/(i|em|b|strong|u)>/,
            `$&</span><span key=${index} style="display: ${
              index === currentIndex ? "inline" : "none"
            };">`
          );
        }

        return `<span key=${index} style="display: ${
          index === currentIndex ? "inline" : "none"
        };">${modifiedSentence}</span>`;
      })
      .join("");

    setNextTextToDisplay(newNextText);
  }, [sentences, currentIndex]);

  const handleTextInputChange = (value) => {
    setInputText(value);
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
            className={`col-2 g-0 mouseHoverBg h-100 ${
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
                <div
                  className="m-0"
                  style={{ display: displayingInput ? "block" : "none" }}
                >
                  <ReactQuill
                    theme="snow"
                    value={inputText}
                    onChange={handleTextInputChange}
                  />
                </div>
                <div className="m-0 d-flex flex-column">
                  <div className="w-100 d-flex justify-content-center mt-2">
                    <button
                      className="btn btn-dark"
                      onClick={handleMinimizeInput}
                    >
                      {displayingInput ? (
                        <i class="bi bi-arrows-collapse fs-3 btn-icons-fill d-flex justify-content-center align-items-center"></i>
                      ) : (
                        <i class="bi bi-arrows-expand fs-3 btn-icons-fill d-flex justify-content-center align-items-center"></i>
                      )}
                    </button>
                  </div>
                  <div className="w-100 d-flex flex-row justify-content-center gap-2 mt-2">
                    <button
                      className="btn btn-dark btn-icons p-0"
                      onClick={handleRestart}
                    >
                      <i className="bi bi-skip-backward fs-3 btn-icons-fill d-flex justify-content-center align-items-center"></i>
                    </button>
                    <button
                      className="btn btn-dark btn-icons p-0"
                      onClick={handleGoBack1}
                    >
                      <i className="bi bi-caret-left fs-3 btn-icons-fill d-flex justify-content-center align-items-center"></i>
                    </button>
                    <button
                      className="btn btn-dark btn-icons p-0"
                      onClick={handleGoForward1}
                    >
                      <i className="bi bi-caret-right fs-3 btn-icons-fill d-flex justify-content-center align-items-center"></i>
                    </button>
                    <button
                      className="btn btn-dark btn-icons p-0"
                      onClick={handleGotolast}
                    >
                      <i className="bi bi-skip-forward fs-3 btn-icons-fill d-flex justify-content-center align-items-center"></i>
                    </button>
                    <button className="btn btn-dark btn-icons p-0">
                      <input
                        className="btn-icons-fill"
                        type="color"
                        value={bgSelectedColor}
                        onChange={handleBgColorChange}
                      />
                    </button>
                    <button className="btn btn-dark btn-icons p-0">
                      <input
                        className="btn-icons-fill"
                        type="color"
                        value={textSelectedColor}
                        onChange={handleTextColorChange}
                      />
                    </button>
                    <button className="btn btn-dark btn-icons p-0">
                      <input
                        className="btn-icons-fill"
                        type="color"
                        value={textBorderSelectedColor}
                        onChange={handleTextBorderColorChange}
                      />
                    </button>
                    <button className="btn btn-dark btn-icons p-0">
                      <input
                        className="btn-icons-fill"
                        type="color"
                        value={nextTextSelectedColor}
                        onChange={handleNextTextColorChange}
                      />
                    </button>
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
                      className="highlighted-word"
                      style={{
                        color: textSelectedColor,
                        WebkitTextStroke: `2px ${textBorderSelectedColor}`,
                      }}
                    >
                      <div
                        className="text-center justify-content-center px-3"
                        dangerouslySetInnerHTML={{
                          __html: textToDisplay,
                        }}
                      />
                    </p>
                    {sentences[currentIndex + 1] && (
                      <p
                        className={`highlighted-word-ba`}
                        style={{ color: nextTextSelectedColor }}
                      >
                        <div
                          className="text-center justify-content-center px-3 position-absolute afterText"
                          dangerouslySetInnerHTML={{
                            __html: nextTextToDisplay,
                          }}
                        />
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`col-2 g-0 mouseHoverBg h-100 ${
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
