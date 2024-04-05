import React from "react";
import { useSelector } from "react-redux";

function MouseHoverBtnPrev({
  isAnimatingLeft,
  handleMouseLeftArea,
  isAnimatingRight,
  handleMouseRightArea,
}) {
  const settings = useSelector((state) => state.settings);

  return (
    <>
      {settings.displayHoverBtns &&
      (settings.hoverRadioValue === "split" ||
        settings.hoverRadioValue === "left") ? (
        <div className="col-2 g-0 h-100 d-flex flex-column gap-5 justify-content-center align-items-center">
          <div
            className={`beforeAfterHoverBtn center-text d-flex justify-content-center align-items-center ${
              isAnimatingLeft ? "beforeAfterHoverAnim" : ""
            }`}
            onMouseEnter={handleMouseLeftArea}
          >
            Previous
          </div>
          {settings.hoverRadioValue === "left" ? (
            <div
              className={`beforeAfterHoverBtn center-text d-flex justify-content-center align-items-center ${
                isAnimatingRight ? "beforeAfterHoverAnim" : ""
              }`}
              onMouseEnter={handleMouseRightArea}
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