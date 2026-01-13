import { Navbar, Container, Nav, Form } from "react-bootstrap"; // Bỏ Button nếu muốn search live
import { Link, useSearchParams, useNavigate } from "react-router-dom"; // Import useSearchParams

function Header() {
  // 1. Khai báo hook để thao tác với URL
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // 2. Hàm xử lý khi gõ phím
  const handleSearch = (e) => {
    const term = e.target.value;

    // Nếu đang ở trang khác (ví dụ About), tự động nhảy về trang chủ để search
    if (window.location.pathname !== "/") {
      navigate(`/?q=${term}`);
    } else {
      // Nếu đang ở trang chủ, cập nhật params ?q=...
      if (term) {
        setSearchParams({ q: term });
      } else {
        setSearchParams({}); // Xóa params nếu ô input rỗng
      }
    }
  };

  return (
    <Navbar expand="lg" className="glass-container mx-3 mt-3 rounded-4" style={{ background: "rgba(255, 255, 255, 0.1)" }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-white">
          🌸 Orchid Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-white" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="text-white">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="text-white">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="text-white">
              Contact
            </Nav.Link>
          </Nav>

          {/* 3. Ô Search nằm bên phải */}
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search orchid..."
              className="glass-input me-2"
              aria-label="Search"
              // Lấy giá trị từ URL để hiển thị (giữ chữ khi F5)
              value={searchParams.get("q") || ""}
              onChange={handleSearch}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;
