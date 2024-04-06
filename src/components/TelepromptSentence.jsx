// src/components/WordTyping.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./TelepromptSentence.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./dark-quill.css";
import DOMPurify from "dompurify";
import MenuModal from "./MenuModal";
import MouseHoverBtnPrev from "./MouseHoverBtnPrev";
import MouseHoverBtnNext from "./MouseHoverBtnNext";
import { setInputText } from "../redux/settingsSlice";

const WordTyping = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  const inputText = settings.inputText;

  const [sentences, setSentences] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [canDecrement, setCanDecrement] = useState(currentIndex > 0);
  const [canIncrement, setCanIncrement] = useState(
    currentIndex < sentences.length - 1
  );

  const [textToDisplay, setTextToDisplay] = useState("");
  const [nextTextToDisplay, setNextTextToDisplay] = useState("");

  const [displayingInput, setDisplayingInput] = useState(true);

  const [showMenu, setShowMenu] = useState(false);
  const handleCloseMenu = () => setShowMenu(false);
  const handleShowMenu = () => setShowMenu(true);

  const handleMinimizeInput = () => {
    setDisplayingInput(!displayingInput);
  };

  const handleMouseLeftArea = () => {
    handleGoBack1();
  };
  const handleMouseRightArea = () => {
    handleGoForward1();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!settings.enableHotkeys) return;

      if (event.keyCode === 37) {
        handleGoBack1();
      } else if (event.keyCode === 39) {
        handleGoForward1();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, settings.enableHotkeys]);

  useEffect(() => {
    let tempInputText = inputText
      .replace(/<\/p>\s*<p[^>]*>/g, "\n")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
    tempInputText = DOMPurify.sanitize(tempInputText, {
      ALLOWED_TAGS: ["i", "em", "b", "strong", "u", "br", "\n"],
      ALLOWED_ATTR: [],
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

    setCanDecrement(currentIndex > 0);
    setCanIncrement(currentIndex < sentences.length - 1);
  }, [sentences, currentIndex]);

  const handleTextInputChange = (value) => {
    dispatch(setInputText(value));
  };
  const handleGoBack1 = () => {
    setCurrentIndex(canDecrement ? currentIndex - 1 : currentIndex);
  };
  const handleGoForward1 = () => {
    setCurrentIndex(canIncrement ? currentIndex + 1 : currentIndex);
  };
  const handleRestart = () => {
    setCurrentIndex(0);
  };
  const handleGotolast = () => {
    setCurrentIndex(sentences.length - 1);
  };

  return (
    <section className="graybg">
      <div className="container-fluid vh-100">
        <div className="row vh-100">
          <MouseHoverBtnPrev
            handleMouseLeftArea={handleMouseLeftArea}
            handleMouseRightArea={handleMouseRightArea}
            canDecrement={canDecrement}
            canIncrement={canIncrement}
          />
          <div className="col g-0 d-flex flex-column">
            <div className="row g-0">
              <div className="col d-flex flex-column pb-3 g-0">
                <div className="d-flex mx-2">
                  <h1 className="w-100 text-start m-0">Teleprompter App</h1>
                  <button className="btn btn-icons" onClick={handleShowMenu}>
                    <i className="bi bi-three-dots"></i>
                  </button>
                </div>
                <div>
                  <div
                    className={`m-0 mx-2 mt-2 react-quill-container ${
                      displayingInput ? "" : "hidden"
                    }`}
                  >
                    <ReactQuill
                      theme="snow"
                      modules={{ toolbar: [["bold", "italic", "underline"]] }}
                      formats={["bold", "italic", "underline"]}
                      value={inputText}
                      onChange={handleTextInputChange}
                    />
                  </div>
                  <div className="w-100 d-flex justify-content-center">
                    <button
                      className="btn btn-dark btn-toggleQuill"
                      onClick={handleMinimizeInput}
                    >
                      {displayingInput ? (
                        <i className="bi bi-arrows-collapse fs-5 btn-icons-fill d-flex justify-content-center align-items-center"></i>
                      ) : (
                        <i className="bi bi-arrows-expand fs-5 btn-icons-fill d-flex justify-content-center align-items-center"></i>
                      )}
                    </button>
                  </div>
                </div>
                {settings.displayActions && (
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
                  </div>
                )}
              </div>
            </div>
            <div
              className="row g-0 flex-grow-1"
              style={{ backgroundColor: settings.bgColor }}
            >
              <div className="col h-100 d-flex flex-column">
                <div className="d-flex justify-content-center align-items-center h-100">
                  <div className="w-100 position-relative">
                    <div
                      style={{
                        fontSize: `${settings.fontSize}px`,
                        color: settings.textColor,
                        WebkitTextStroke: `${settings.fontSize / 32}px ${
                          settings.textBorderColor
                        }`,
                      }}
                    >
                      <div
                        className="text-center justify-content-center px-3"
                        dangerouslySetInnerHTML={{
                          __html: textToDisplay,
                        }}
                      />
                    </div>
                    {sentences[currentIndex + 1] && (
                      <div
                        style={{
                          fontSize: `${settings.fontSize}px`,
                          color: settings.nextTextColor,
                        }}
                      >
                        <div
                          className="text-center justify-content-center px-3 position-absolute afterText"
                          dangerouslySetInnerHTML={{
                            __html: nextTextToDisplay,
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <MouseHoverBtnNext
            handleMouseLeftArea={handleMouseLeftArea}
            handleMouseRightArea={handleMouseRightArea}
            canDecrement={canDecrement}
            canIncrement={canIncrement}
          />
        </div>
      </div>
      <MenuModal showMenu={showMenu} handleCloseMenu={handleCloseMenu} />
    </section>
  );
};

export default WordTyping;
