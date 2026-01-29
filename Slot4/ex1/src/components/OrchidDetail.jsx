import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import orchidService from "../services/orchidService";
import ConfirmModal from "./ConfirmModal";
import "./OrchidDetail.css";

function OrchidDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orchid, setOrchid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    // Fetch orchid data by ID
    orchidService.getById(id)
      .then((res) => {
        setOrchid(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orchid detail:", err);
        toast.error("Không thể tải dữ liệu hoa lan");
        setLoading(false);
      });
  }, [id]);

  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    orchidService.delete(orchid.id)
      .then(() => {
        toast.success(`"${orchid.orchidName}" đã được xóa thành công! 🗑️`);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        console.error("Error deleting orchid:", err);
        toast.error("Có lỗi khi xóa hoa lan. Vui lòng thử lại!");
      });
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="warning" className="me-3" />
        <h5 className="text-white mt-3">Đang tải...</h5>
      </Container>
    );
  }

  if (!orchid) {
    return (
      <Container className="py-5 text-center">
        <h2 className="text-white">Orchid không tìm thấy</h2>
        <Button 
          variant="primary" 
          onClick={() => navigate("/")}
          className="mt-3"
        >
          Quay lại trang chủ
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="align-items-stretch g-4">
        {/* Ảnh bên trái */}
        <Col lg={6} md={12} className="d-flex">
          <div className="orchid-image-wrapper w-100">
            <img
              src={orchid.image}
              alt={orchid.orchidName}
              className="img-fluid rounded-3 orchid-image"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </Col>

        {/* Nội dung bên phải */}
        <Col lg={6} md={12} className="d-flex">
          <div className="orchid-content w-100">
            <h1 className="mb-2 text-warning fw-bold" style={{ fontSize: "2.5rem" }}>
              {orchid.orchidName}
            </h1>

            {orchid.isSpecial && (
              <div className="mb-4">
                <span className="badge bg-danger fs-6 px-3 py-2">
                  ★ Special Item
                </span>
              </div>
            )}

            <hr className="border-warning opacity-50" />

            <div className="orchid-section">
              <h6 className="text-info fw-bold mb-2" style={{ fontSize: "0.9rem", letterSpacing: "1px" }}>
                CATEGORY
              </h6>
              <p className="fs-5 mb-0 text-black">{orchid.category.name}</p>
            </div>

            <div className="orchid-section">
              <h6 className="text-info fw-bold mb-2" style={{ fontSize: "0.9rem", letterSpacing: "1px" }}>
                DESCRIPTION
              </h6>
              <p className="fs-6 lh-lg text-black">{orchid.description}</p>
            </div>

            <div className="orchid-section price-box">
              <h6 className="text-info fw-bold mb-2" style={{ fontSize: "0.9rem", letterSpacing: "1px" }}>
                PRICE
              </h6>
              <p className="fs-3 text-black fw-bold mb-0">${orchid.price || 0}</p>
            </div>

            <div className="d-flex gap-3 mt-5">
              <Button
                variant="success"
                size="lg"
                className="fw-bold"
                onClick={() => navigate(`/edit-orchid/${orchid.id}`)}
                style={{ padding: "12px 30px" }}
              >
                ✏️ Update
              </Button>
              <Button
                variant="danger"
                size="lg"
                className="fw-bold"
                onClick={() => setShowDeleteModal(true)}
                style={{ padding: "12px 30px" }}
              >
                🗑️ Delete
              </Button>
              <Button
                variant="outline-light"
                size="lg"
                className="fw-bold text-black"
                onClick={() => navigate("/")}
                style={{ padding: "12px 30px" }}
              >
                ← Back
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <ConfirmModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        title="Xác nhận xóa"
        body={`Bạn có chắc chắn muốn xóa "${orchid?.orchidName}" không? Hành động này không thể hoàn tác!`}
        onConfirm={handleDeleteConfirm}
      />
    </Container>
  );
}

export default OrchidDetail;
