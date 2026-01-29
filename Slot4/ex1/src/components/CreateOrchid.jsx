import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import orchidService from "../services/orchidService";
import "./CreateOrchid.css";

function CreateOrchid() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orchidName: "",
    description: "",
    category: {
      id: ""
    },
    isSpecial: false,
    image: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);

  const [categories, setCategory] = useState([{
    id:"",
    name:"",
  }]) ;
    useEffect(() => {
    orchidService.getCategory().then(res => {
      console.log("Data Create Log "+res.data)
      setCategory(res.data);
      
    }).catch(err => {
      console.error("Error fetching orchids:", err);
      
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
const handleCategoryChange = (e) => {
  setFormData({
    ...formData,
    category: {
      id: Number(e.target.value)
    }
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.orchidName || !formData.description || !formData.category || !formData.image || !formData.price) {
      toast.error("Vui lòng điền đầy đủ tất cả các trường!");
      return;
    }

    setLoading(true);
    
    try {
      // Chuyển đổi type dữ liệu
      const newOrchid = {
        orchidName: formData.orchidName,
        description: formData.description,
        category: formData.category,
        isSpecial: formData.isSpecial,  
        image: formData.image,
        price: parseInt(formData.price),
      };
      
      await orchidService.create(newOrchid);
      toast.success("Tạo hoa lan mới thành công! 🎉");
      
      // Quay lại trang chủ sau 1 giây
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error creating orchid:", error);
      toast.error("Có lỗi khi tạo hoa lan. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="orchid-page-bg d-flex align-items-center justify-content-center min-vh-100">
      <Container className="my-5" style={{ maxWidth: "600px" }}>
        <Card className="create-orchid-card border-0 shadow-lg">
        <Card.Header className="bg-gradient text-white">
          <Card.Title className="mb-0">Tạo Hoa Lan Mới</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {/* Orchid Name */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Tên Hoa Lan *</Form.Label>
              <Form.Control
                type="text"
                name="orchidName"
                value={formData.orchidName}
                onChange={handleInputChange}
                placeholder="Nhập tên hoa lan"
                required
              />
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Mô Tả *</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Nhập mô tả chi tiết"
                rows={4}
                required
              />
            </Form.Group>

            {/* Category */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Loại Hoa *</Form.Label>
             <Form.Select
  name="category"
  value={formData.category.id}
  onChange={handleCategoryChange}
  required
>
  <option value="">-- Chọn loại hoa --</option>
  {categories.map((cat) => (
    <option key={cat.id} value={cat.id}>
      {cat.name}
    </option>
  ))}
</Form.Select>

            </Form.Group>

            {/* isSpecial */}
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="isSpecial"
                label="Đánh dấu là hoa đặc biệt"
                checked={formData.isSpecial}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Image URL */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Link Hình Ảnh *</Form.Label>
              <Form.Control
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="Nhập URL hình ảnh"
                required
              />
            </Form.Group>

            {/* Price */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Giá ($) *</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Nhập giá"
                required
              />
            </Form.Group>

            {/* Preview Hình Ảnh */}
            {formData.image && (
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Xem Trước Hình Ảnh</Form.Label>
                <div className="image-preview mt-2">
                  <img
                    src={formData.image}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "300px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </Form.Group>
            )}

            {/* Buttons */}
            <div className="d-grid gap-2 mt-4">
              <Button
                variant="success"
                type="submit"
                size="lg"
                disabled={loading}
              >
                {loading ? "Đang tạo..." : "Tạo Hoa Lan"}
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => navigate("/")}
              >
                Hủy
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      </Container>
    </div>
  );
}

export default CreateOrchid;
