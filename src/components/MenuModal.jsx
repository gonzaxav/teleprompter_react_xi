import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function MenuModal({
  showMenu,
  handleCloseMenu,
  bgSelectedColor,
  handleBgColorChange,
  textSelectedColor,
  handleTextColorChange,
  textBorderSelectedColor,
  handleTextBorderColorChange,
  nextTextSelectedColor,
  handleNextTextColorChange
}) {
  return (
    <>
      <Modal show={showMenu} onHide={handleCloseMenu}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMenu}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseMenu}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MenuModal;
