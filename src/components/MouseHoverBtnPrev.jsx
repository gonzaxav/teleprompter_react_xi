import React from "react";
import { useSelector } from "react-redux";

function MouseHoverBtnPrev({
  isAnimatingLeft,
  handleMouseLeftArea,
  isAnimatingRight,
  handleMouseRightArea,
  canDecrement,
  canIncrement,
}) {
  const settings = useSelector((state) => state.settings);

  return (
    <>
      {settings.displayHoverBtns &&
      (settings.hoverRadioValue === "split" ||
        settings.hoverRadioValue === "left") ? (
        <div className="col-2 g-0 h-100 d-flex flex-column gap-5 justify-content-center align-items-center">
          <div
            className={`beforeAfterHoverBtn material-bubble prev ${canDecrement ? "" : "disabled"} center-text d-flex justify-content-center align-items-center ${
              isAnimatingLeft ? "beforeAfterHoverAnim" : ""
            }`}
            onMouseEnter={handleMouseLeftArea}
            onClick={handleMouseLeftArea}
          >
            Previous
          </div>
          {settings.hoverRadioValue === "left" ? (
            <div
              className={`beforeAfterHoverBtn material-bubble next ${canIncrement ? "" : "disabled"} center-text d-flex justify-content-center align-items-center ${
                isAnimatingRight ? "beforeAfterHoverAnim" : ""
              }`}
              onMouseEnter={handleMouseRightArea}
              onClick={handleMouseRightArea}
            >
              Next
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="col-skinny px-3"></div>
      )}
    </>
  );
}

export default MouseHoverBtnPrev;
