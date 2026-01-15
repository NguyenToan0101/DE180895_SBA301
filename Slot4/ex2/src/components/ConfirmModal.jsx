import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function ConfirmModal({
  show,
  handleClose,
  title,
  body,
  onConfirm,
}) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
      <Modal.Header closeButton className="glass-container border-0">
        <Modal.Title className="text-white fw-bold">{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="glass-container border-0 text-white">
        {body}
      </Modal.Body>

      <Modal.Footer className="glass-container border-0">
        <Button variant="secondary" onClick={handleClose} className="glass-btn">
          Hủy
        </Button>
        <Button variant="primary" onClick={onConfirm} className="glass-btn" style={{ background: "rgba(102, 126, 234, 0.4)" }}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
