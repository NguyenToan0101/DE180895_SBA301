import { Container, Row, Col, Image } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../stores/UserContext";

function Footer() {
  const { user } = useContext(UserContext);
  return (
    <footer className="glass-container mt-5 mx-3 rounded-4">
      <Container>
        <Row className="align-items-center">
          <Col xs="auto">
            <Image
              src="./images/anhthe.png"
              roundedCircle
              width={50}
              height={50}
              alt="avatar"
              style={{ border: "2px solid rgba(255, 255, 255, 0.3)" }}
            />
          </Col>
          <Col>
            <h6 className="mb-0 text-black">Người đang đăng nhập: {user?.name || "Người dùng chưa đăng nhập"}</h6>
            <p className="mb-0 text-black-50 small">All rights reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
