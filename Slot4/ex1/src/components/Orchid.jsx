import { useState } from "react";
import Container from "react-bootstrap/Container";
import ConfirmModal from "./ConfirmModal";
import ListOfOrchids from "./ListOfOrchids";
import TestCount from "./TestCount";

function Orchid({ orchidList }) {
  const [show, setShow] = useState(false);
  const [selectedOrchid, setSelectedOrchid] = useState(null);

  const handleClose = () => setShow(false);

  const handleShow = (orchid) => {
    setSelectedOrchid(orchid);
    setShow(true);
  };

  const handleConfirm = () => {
    console.log("Đã xác nhận: ", selectedOrchid?.orchidName);
    setShow(false);
  };

  return (
    <div>
      <Container className="py-5">
        <h1 className="text-white mb-5 text-center">🌺 Our Beautiful Orchids Collection</h1>
        <ListOfOrchids orchidList={orchidList} onShowModal={handleShow} />

        {selectedOrchid && (
          <ConfirmModal
            show={show}
            handleClose={handleClose}
            title={selectedOrchid.orchidName}
            onConfirm={handleConfirm}
            body={
              <div>
                <img
                  src={selectedOrchid.image}
                  alt={selectedOrchid.orchidName}
                  className="img-fluid mb-3 rounded"
                  style={{ width: "100%" }}
                />
                <p className="text-white">
                  <strong>Description:</strong> {selectedOrchid.description}
                </p>
                <p className="text-white">
                  <strong>Category:</strong> {selectedOrchid.category}
                </p>
                <p className="text-white">
                  <strong>Price:</strong> <span className="text-warning fs-5">${selectedOrchid.price || 0}</span>
                </p>
                {selectedOrchid.isSpecial && (
                  <p className="text-danger fw-bold fs-5">★ Special Item</p>
                )}
              </div>
            }
          />
        )}
      </Container>
      <div className="text-center my-4">
        <TestCount />
      </div>
    </div>
  );
}

export default Orchid;
