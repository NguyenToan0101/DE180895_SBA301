import { Navbar, Container, Nav, Form,Button, Dropdown, Image  } from "react-bootstrap"; // Bỏ Button nếu muốn search live
import { Link, useSearchParams, useNavigate } from "react-router-dom"; // Import useSearchParams
import { useState } from "react";

function Header({ user, setUser, onLogout }) {
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
 const handleLogout = () => {
    setUser(null); localStorage.removeItem("user");window.location.reload();
  };
  return (
  <Navbar
  expand="lg"
  className="glass-container mx-3 mt-3 rounded-4"
  style={{ background: "rgba(255, 255, 255, 0.1)" }}
>
  <Container>
    <Navbar.Brand as={Link} to="/" className="fw-bold text-white">
      🌸 Orchid Shop
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-white" />

    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/" className="text-white">Home</Nav.Link>
        <Nav.Link as={Link} to="/about" className="text-white">About</Nav.Link>
        <Nav.Link as={Link} to="/contact" className="text-white">Contact</Nav.Link>
      </Nav>

      {/* Search + Login / User */}
      <div className="d-flex align-items-center gap-3">
        {/* Search */}
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search orchid..."
            className="glass-input"
            value={searchParams.get("q") || ""}
            onChange={handleSearch}
          />
        </Form>

        {/* Login / Avatar */}
        {!user ? (
          <Link to="/login">
            <Button
              variant="outline-light"
              className="rounded-pill px-4"
            >
              Login
            </Button>
          </Link>
        ) : (
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="transparent"
              className="d-flex align-items-center gap-2 border-0"
            >
              <Image
                src={user.avatar}
                roundedCircle
                width={36}
                height={36}
              />
              <span className="text-white fw-semibold">{user.name}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu className="shadow rounded-3">
              <Dropdown.Item as={Link} to="/profile">
                👤 Profile
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/orders">
                📦 My Orders
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => handleLogout()}
                className="text-danger"
              >
                🚪 Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </Navbar.Collapse>
  </Container>
</Navbar>

  );
}
export default Header;
