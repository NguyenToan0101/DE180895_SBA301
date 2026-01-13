import { Container, Row, Col, Image } from "react-bootstrap";

function Footer({ avatar, name, email }) {
  return (
    <footer className="glass-container mt-5 mx-3 rounded-4">
      <Container>
        <Row className="align-items-center">
          <Col xs="auto">
            <Image
              src={avatar}
              roundedCircle
              width={50}
              height={50}
              alt="avatar"
              style={{ border: "2px solid rgba(255, 255, 255, 0.3)" }}
            />
          </Col>
          <Col>
            <h6 className="mb-0 text-white">Tác giả: {name}</h6>
            <p className="mb-0 text-white-50 small">All rights reserved</p>
          </Col>
          <Col xs="auto" className="ms-auto">
            <h6 className="mb-0 text-white">Thông tin liên hệ</h6>
            <p className="mb-0 text-white-50">{email}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
