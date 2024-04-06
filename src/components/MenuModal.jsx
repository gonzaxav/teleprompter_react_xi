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
} from "../redux/settingsSlice";

const MenuModal = ({ showMenu, handleCloseMenu }) => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

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

  const handleReset = () => {
    dispatch(resetState());
  };

  return (
    <>
      <Modal show={showMenu} onHide={handleCloseMenu}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <button onClick={handleReset} className="btn btn-success">
                  Default
                </button>
              </div>

              <div className="row">
                <div className="col">
                  <button className="btn btn-click-dark btn-icons p-0">
                    <input
                      className="btn-icons-fill"
                      type="color"
                      name="bgColor"
                      value={settings.bgColor}
                      onChange={handleColorInputChange}
                    />
                  </button>
                  <button className="btn btn-click-dark btn-icons p-0">
                    <input
                      className="btn-icons-fill"
                      type="color"
                      name="textColor"
                      value={settings.textColor}
                      onChange={handleColorInputChange}
                    />
                  </button>
                  <button className="btn btn-click-dark btn-icons p-0">
                    <input
                      className="btn-icons-fill"
                      type="color"
                      name="textBorderColor"
                      value={settings.textBorderColor}
                      onChange={handleColorInputChange}
                    />
                  </button>
                  <button className="btn btn-click-dark btn-icons p-0">
                    <input
                      className="btn-icons-fill"
                      type="color"
                      name="nextTextColor"
                      value={settings.nextTextColor}
                      onChange={handleColorInputChange}
                    />
                  </button>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div class="mb-3 form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      checked={settings.displayActions}
                      onChange={handleCheckboxChangeDisplayActions}
                    />
                    <label class="form-check-label">Show Actions</label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div class="mb-3 form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      checked={settings.displayHoverBtns}
                      onChange={handleCheckboxChangeDisplayHover}
                    />
                    <label class="form-check-label">Show Hover Buttons</label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div class="mb-3 form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      checked={settings.enableHotkeys}
                      onChange={handleCheckboxChangeEnableHotkeys}
                    />
                    <label class="form-check-label">Enable Hotkeys</label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label>
                    <input
                      type="radio"
                      value="split"
                      checked={settings.hoverRadioValue === "split"}
                      onChange={handleHoverRadioChange}
                    />
                    Split
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="left"
                      checked={settings.hoverRadioValue === "left"}
                      onChange={handleHoverRadioChange}
                    />
                    Left
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="right"
                      checked={settings.hoverRadioValue === "right"}
                      onChange={handleHoverRadioChange}
                    />
                    Right
                  </label>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label htmlFor="fontSizeInput">Font Size:</label>
                  <input
                    id="fontSizeInput"
                    type="number"
                    min={0}
                    value={settings.fontSize}
                    onChange={handleFontSizeChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMenu}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MenuModal;
