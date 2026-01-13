import { useState } from "react";
import { Form, Button, Modal, Container } from "react-bootstrap";

export default function Contact() {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false || !formData.agree) {
      setValidated(true);
      return;
    }

    setValidated(true);
    setShow(true);
  };

  return (
    <Container className="py-5">
      <div className="glass-container mx-auto" style={{ maxWidth: "600px" }}>
        <h3 className="mb-4 text-white text-center">✨ Contact Form</h3>

        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3" controlId="validationFirstName">
            <Form.Label className="text-white">First Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="glass-input"
            />
            <Form.Control.Feedback type="invalid">
              Please enter your first name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="validationLastName">
            <Form.Label className="text-white">Last Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="glass-input"
            />
            <Form.Control.Feedback type="invalid">
              Please enter your last name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="validationPhone">
            <Form.Label className="text-white">Phone</Form.Label>
            <Form.Control
              required
              type="tel"
              placeholder="Enter phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              pattern="^[0-9\-+\s()]*$"
              className="glass-input"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid phone number.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="validationEmail">
            <Form.Label className="text-white">Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="glass-input"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4" controlId="validationAgree">
            <Form.Check
              required
              type="checkbox"
              label="I agree to the terms"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              feedback="You must agree before confirming."
              feedbackType="invalid"
              className="text-white"
            />
          </Form.Group>

          <Button type="submit" className="glass-btn w-100 fw-bold">
            Confirm
          </Button>
        </Form>
      </div>

      {/* Modal hiển thị thông tin sau khi valid */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton className="glass-container border-0">
          <Modal.Title className="text-white">Your Submitted Info</Modal.Title>
        </Modal.Header>

        <Modal.Body className="glass-container border-0">
          <p className="text-white"><strong>First Name:</strong> {formData.firstName}</p>
          <p className="text-white"><strong>Last Name:</strong> {formData.lastName}</p>
          <p className="text-white"><strong>Phone:</strong> {formData.phone}</p>
          <p className="text-white"><strong>Email:</strong> {formData.email}</p>
          <p className="text-white"><strong>Agreed:</strong> {formData.agree ? "Yes" : "No"}</p>
        </Modal.Body>

        <Modal.Footer className="glass-container border-0">
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
