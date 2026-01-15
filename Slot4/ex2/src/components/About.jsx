import { Container } from "react-bootstrap";

function About() {
  return (
    <Container className="py-5">
      <div className="glass-container mx-auto rounded-4" style={{ maxWidth: "600px" }}>
        <h2 className="text-white mb-3">👨‍💼 Nguyễn Công Toàn</h2>
        <p className="text-white-50">
          <strong className="text-white">Mã sinh viên:</strong> DE180895
        </p>
        <p className="text-white mt-4">
          Chào mừng bạn đến với Orchid Shop - nơi cung cấp những loài lan tuyệt đẹp nhất!
        </p>
      </div>
    </Container>
  );
}
export default About;
