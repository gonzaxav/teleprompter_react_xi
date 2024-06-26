import "./MenuModal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import {
  setString,
  resetState,
  setDisplayActions,
  setDisplayHoverBtns,
  setEnableHotkeys,
  setHoverRadioValue,
  setFontSize,
  setTextStroke,
} from "../redux/settingsSlice";
import { useState } from "react";

const MenuModal = ({ showMenu, handleCloseMenu }) => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  const [menuSelected, setMenuSelected] = useState("functionality");

  const handleColorInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setString({ name, value }));
  };

  const handleCheckboxChangeDisplayActions = () => {
    dispatch(setDisplayActions(!settings.displayActions));
  };

  const handleCheckboxChangeDisplayHover = () => {
    dispatch(setDisplayHoverBtns(!settings.displayHoverBtns));
  };

  const handleCheckboxChangeEnableHotkeys = () => {
    dispatch(setEnableHotkeys(!settings.enableHotkeys));
  };

  const handleHoverRadioChange = (e) => {
    dispatch(setHoverRadioValue(e.target.value));
  };

  const handleFontSizeChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0) {
      dispatch(setFontSize(value));
    }
  };

  const handleCheckboxChangeTextBorder = () => {
    dispatch(setTextStroke(!settings.textStroke));
  };

  const handleButtonClick = (menu) => {
    setMenuSelected(menu);
  };

  const handleReset = () => {
    dispatch(resetState());
  };

  return (
    <>
      <Modal show={showMenu} onHide={handleCloseMenu} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="row">
                  <div className="col gray-2-bg py-2 leftPart"></div>
                  <div className="col gray-3-bg ps-4 py-2 d-flex justify-content-end">
                    <button
                      className="btn btn-click-dark"
                      onClick={handleReset}
                    >
                      Reset settings
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col leftPart gray-2-bg d-flex flex-column justify-content-start gap-1">
                    <button
                      className={`btn btn-transparent text-start ${
                        menuSelected === "functionality" ? "active" : ""
                      }`}
                      onClick={() => handleButtonClick("functionality")}
                    >
                      Functionality
                    </button>
                    <button
                      className={`btn btn-transparent text-start ${
                        menuSelected === "colors" ? "active" : ""
                      }`}
                      onClick={() => handleButtonClick("colors")}
                    >
                      Colors
                    </button>
                    <button
                      className={`btn btn-transparent text-start ${
                        menuSelected === "text" ? "active" : ""
                      }`}
                      onClick={() => handleButtonClick("text")}
                    >
                      Text
                    </button>
                  </div>
                  <div className="col gray-3-bg ps-4">
                    {menuSelected === "colors" && (
                      <div className="row">
                        <div className="col">
                          <p className="checkbox-title mb-0">Colors</p>
                          <p className="checkbox-description">
                            Modify the colors of the application. Some recording
                            applications work best with a saturated green screen
                            effect.
                          </p>
                          <div className="row mb-3">
                            <div className="col">
                              <p className="mb-1">Background color:</p>
                              <input
                                className="btn-colors-fill"
                                type="color"
                                name="bgColor"
                                value={settings.bgColor}
                                onChange={handleColorInputChange}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col">
                              <p className="mb-1">Text color:</p>
                              <input
                                className="btn-colors-fill"
                                type="color"
                                name="textColor"
                                value={settings.textColor}
                                onChange={handleColorInputChange}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col">
                              <p className="mb-1">Text border color:</p>
                              <input
                                className="btn-colors-fill"
                                type="color"
                                name="textBorderColor"
                                value={settings.textBorderColor}
                                onChange={handleColorInputChange}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col">
                              <p className="mb-1">Upcoming text color:</p>
                              <input
                                className="btn-colors-fill"
                                type="color"
                                name="nextTextColor"
                                value={settings.nextTextColor}
                                onChange={handleColorInputChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {menuSelected === "functionality" && (
                      <div className="row">
                        <div className="col">
                          <div class="mb-3 form-check">
                            <input
                              type="checkbox"
                              class="form-check-input"
                              checked={settings.displayActions}
                              onChange={handleCheckboxChangeDisplayActions}
                              id="showActions"
                            />
                            <label
                              class="form-check-label"
                              htmlFor="showActions"
                            >
                              Display navigation actions
                            </label>
                            <p className="checkbox-description">
                              Buttons such as "change to the next, previous,
                              first or last element".
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {menuSelected === "functionality" && (
                      <div className="row">
                        <div className="col">
                          <div class="mb-3 form-check">
                            <input
                              type="checkbox"
                              class="form-check-input"
                              checked={settings.displayHoverBtns}
                              onChange={handleCheckboxChangeDisplayHover}
                              id="showHoverButtons"
                            />
                            <label
                              class="form-check-label"
                              htmlFor="showHoverButtons"
                            >
                              Display hover triggers
                            </label>
                            <p className="checkbox-description">
                              Areas that get triggered when the mouse hovers
                              over them. Does not require clicking; perfect for
                              recording.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {menuSelected === "functionality" && (
                      <div className="row">
                        <div className="col">
                          <div class="mb-3 form-check">
                            <input
                              type="checkbox"
                              class="form-check-input"
                              checked={settings.enableHotkeys}
                              onChange={handleCheckboxChangeEnableHotkeys}
                              id="enableHotkeys"
                            />
                            <label
                              class="form-check-label"
                              htmlFor="enableHotkeys"
                            >
                              Enable keyboard hotkeys
                            </label>
                            <p className="checkbox-description">
                              Left & right arrow keys change text to
                              previous/next.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {menuSelected === "functionality" && (
                      <>
                        <hr />
                        <div className="row">
                          <div className="col d-flex flex-column gap-1">
                            <p className="checkbox-title mb-0">
                              Hover Trigger Positions
                            </p>
                            <p className="checkbox-description">
                              Choose where you would prefer the hover triggers
                              to be positioned.
                            </p>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="radio"
                                value="split"
                                name="radioDisplay"
                                checked={settings.hoverRadioValue === "split"}
                                onChange={handleHoverRadioChange}
                                id="radioSplit"
                              />
                              <label class="form-check-label" for="radioSplit">
                                One on each side
                              </label>
                            </div>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="radio"
                                value="left"
                                name="radioDisplay"
                                checked={settings.hoverRadioValue === "left"}
                                onChange={handleHoverRadioChange}
                                id="radioLeft"
                              />
                              <label class="form-check-label" for="radioLeft">
                                Both left
                              </label>
                            </div>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="radio"
                                value="right"
                                name="radioDisplay"
                                checked={settings.hoverRadioValue === "right"}
                                onChange={handleHoverRadioChange}
                                id="radioRight"
                              />
                              <label class="form-check-label" for="radioRight">
                                Both right
                              </label>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {menuSelected === "text" && (
                      <div className="row mb-3">
                        <div className="col">
                          <div className="position-relative">
                            <label for="customRange2" class="form-label">
                              Font Size:
                            </label>
                            <input
                              type="range"
                              className="form-range"
                              min="32"
                              max="80"
                              step="8"
                              id="fontSizeInput"
                              value={settings.fontSize}
                              onChange={handleFontSizeChange}
                              list="fontSizeMarks"
                            />
                            <datalist id="fontSizeMarks">
                              <option value="32">32</option>
                              <option value="40">40</option>
                              <option value="48">48</option>
                              <option value="56">56</option>
                              <option value="64">64</option>
                              <option value="72">72</option>
                              <option value="80">80</option>
                            </datalist>
                          </div>
                        </div>
                      </div>
                    )}

                    {menuSelected === "text" && (
                      <div className="row">
                      <div className="col">
                        <div class="mb-3 form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            checked={settings.textStroke}
                            onChange={handleCheckboxChangeTextBorder}
                            id="textStroke"
                          />
                          <label
                            class="form-check-label"
                            htmlFor="textStroke"
                          >
                            Display text border
                          </label>
                        </div>
                      </div>
                    </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="container-fluid m-0">
            <div className="row">
              <div className="col gray-2-bg py-2 leftPart"></div>
              <div className="col gray-3-bg ps-4 py-2 d-flex justify-content-end">
                <Button variant="secondary" onClick={handleCloseMenu}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MenuModal;
